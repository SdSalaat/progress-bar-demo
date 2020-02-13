import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import ProgressBars from './components/progressBars';
import apiCall from './services/dataService';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('<App />', () => {
  test('Check For Container', () => {
    const app = shallow(<App />);
    expect(app.find('div.container').length).toEqual(1);
  });

  test('Check For ProgressBar Container', () => {
    const wrapper = shallow(<ProgressBars bar={43} />);
    console.log(wrapper.debug());
  });

  test('API Response to be 200', () => {
    apiCall.then(data => {
      data.status().toEqual(200)
    });
  });
})
