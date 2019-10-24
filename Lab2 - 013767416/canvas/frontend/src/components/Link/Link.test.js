// Link.react.test.js
import React from 'react';
import Link from './Link';
import People from '../People/People';
import renderer from 'react-test-renderer';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { mount, shallow, render } from 'enzyme';

it('should render correctly', () => {
  const component = mount( <Link page="http://www.facebook.com">Facebook</Link>);
  expect(component).toMatchSnapshot();
});


it('render correctly Spinner component', () => {  
  const SpinnerComponent = mount(<People />);
  expect(SpinnerComponent).toMatchSnapshot();
});



it('changes the class when hovered', () => {
    const component = renderer.create(
      <Link page="http://www.facebook.com">Facebook</Link>
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    
    // manually trigger the callback
    tree.props.onMouseEnter();
     // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    
  });



 