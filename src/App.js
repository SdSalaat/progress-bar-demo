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
        selectOptions: [],
        selectedOption: "0"
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
        let newBars = this.state.bars;
        let position = this.state.selectedOption;
        let val = (value + newBars[position]) < 0 ? 0 : value + newBars[position];

        newBars.splice(position, 1, val);

        this.setState({
            ...this.state,
            bars: newBars
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
        <option key={index} value={index}>#progress-{index}</option>
    ));

    // Handling HTML for Buttons
    renderButtons = () => this.state.buttons.map((button, index) => (
        <button onClick={this.handleButton.bind(this, button)} className='button__padding btn btn-sm btn-primary'
                key={index}>{button}</button>
    ));

    render() {
        return (
            <div className='padding__main'>
                <h1>Progress Bar Demo</h1>
                {this.barsHTML()}
                <select className='form-control-sm' onChange={this.handleSelect.bind(this)}>
                    {this.renderSelectOptions()}
                </select>
                {this.renderButtons()}
            </div>
        );
    }
}

export default App;
