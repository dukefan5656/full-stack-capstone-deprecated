import React from 'react';
import { shallow, mount } from 'enzyme';

import { ListingForm } from './CreateListing';


describe('ListingForm', () => {
	it('does not crash', () => {
		const wrapper = shallow(<ListingForm />);
		expect(wrapper.state('headline')).toEqual('');
	});

	it('updates state when inputs change', () => {
		const wrapper = shallow(<ListingForm />);

		for (const name of ['headline', 'street', 'zip', 'city', 'type', 'bed', 'bath', 'footage', 'description',]){
			wrapper.find(`[name='${name}']`).simulate('change', { target: { value: name } });
			expect(wrapper.state(name)).toEqual(name);
		}
	});

	it('calls addListing', () => {
		const addListing = jest.fn();
		const wrapper = mount(<ListingForm addListing={addListing} />);

		wrapper.find('input[name=\'headline\']').simulate('change', { target: { value: 'newheadline' } });
		wrapper.find('button').simulate('submit');
		expect(addListing).toBeCalledWith(wrapper.state());
	});
});
