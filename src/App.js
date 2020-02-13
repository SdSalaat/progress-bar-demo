import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiCall from './services/dataService';
import ProgressBars from './components/progressBars';

class App extends React.Component {
    // Application State
    state = {
        buttons: [],
        bars: [],
        selectedOption: 1
    };

    // LifeCycle Hooks
    componentDidMount() {
        apiCall.then(data => {
            this.setState({
                ...this.state,
                buttons: data.buttons,
                bars: data.bars
            })
        });
    }

    // Event Handling For Dropdown
    handleSelect = (e) => {
        this.setState({
            ...this.state,
            selectedOption: e.target.value
        })
    };

    // Event Handling For Button
    handleButton = (value) => {
        let newBars = this.state.bars.slice();
        let position = this.state.selectedOption-1;
        let val = (value + newBars[position]) < 0 ? 0 : value + newBars[position];

        this.setState({
            ...this.state,
            bars: newBars.map((item, index)=>{
                if (index === position) {
                    return val;
                }
                return item;
            })
        })
    };

    // Handling HTML for Bars
    barsHTML = () => this.state.bars.map((bar, index) => (
        <div key={index} className='padding__bar'>
            <ProgressBars
                id={`progress-${index}`}
                bar={bar}
            />
        </div>
    ));

    // Handling HTML for select Options
    renderSelectOptions = () => this.state.bars.map((bar, index) => (
        <option key={index} value={index+1}>#progress-{index+1}</option>
    ));

    // Handling HTML for Buttons
    renderButtons = () => this.state.buttons.map((button, index) => (
        <button onClick={this.handleButton.bind(this, button)} className='button__padding btn btn-sm btn-primary'
                key={index}>{button}</button>
    ));

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <h2>Progress Bar Demo</h2>
                    </div>
                </div>
                <div>
                    {this.barsHTML()}
                </div>
                <br/>
                <select className='form-control-sm' onChange={this.handleSelect.bind(this)}>
                    {this.renderSelectOptions()}
                </select>
                {this.renderButtons()}
            </div>
        );
    }
}

export default App;
