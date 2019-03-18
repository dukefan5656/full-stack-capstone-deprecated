import { mockStore } from '../setupTests';
import { currentUserReducer, userReducer, bidReducer, listingReducer} from './index';
import * as Actions from '../actions/index';


const applyActions = (actions, reducer) => actions.reduce((store, action) => reducer(store, action), undefined);

const sellerPayload = { user: {
	_id: 0, listings: [
		{ _id: 1, bids: [ { _id: 70, user: { _id: 10 } } ] },
		{ _id: 2, bids: [ { _id: 71, user: { _id: 11 } } ] },
	]
} };

const agentPayload = { user: {
	_id: 0, bids: [
		{ _id: 1, listing: { _id: 2, user: { _id: 5 } } },
		{ _id: 11, listing: { _id: 12, user: { _id: 15 } } }
	]
} };

const listingPayload = { listing: {
	_id: 0, bids: [ {_id: 1, user: { _id: 2 } } ] }
};


describe('currentUser', () => {
	test('initial', () => expect(currentUserReducer(undefined, {})).toEqual({ user: null, email: null, userType: null }))

	test(Actions.SIGN_UP_SUCCESS, () => {
		const store = mockStore(currentUserReducer(undefined, {}));

		store.dispatch(Actions.signupSuccess({ user: {
			_id: 'id',
			local: { email: 'signup' },
			type: 'type'
		} }));

		expect(applyActions(store.getActions(), currentUserReducer)).toEqual({ user: 'id', email: 'signup', userType: 'type' });
	});

	test(Actions.LOG_IN_SUCCESS, () => {
		const store = mockStore(currentUserReducer(undefined, {}));

		store.dispatch(Actions.logInSuccess({ user: {
			_id: 'id',
			local: { email: 'login' },
			type: 'type'
		} }));

		expect(applyActions(store.getActions(), currentUserReducer)).toEqual({ user: 'id', email: 'login', userType: 'type' });
	});

	test(Actions.LOG_OUT_SUCCESS, () => {
		const store = mockStore(currentUserReducer({ user: 'id', email: 'em', userType: 'type' }, {}));

		store.dispatch(Actions.logoutSuccess());

		expect(applyActions(store.getActions(), currentUserReducer)).toEqual({ user: null, email: null, userType: null });
	});
});

describe('userReducer', () => {
	test('initial', () => expect(userReducer(undefined, {})).toEqual({}));

	test(Actions.GET_LISTING_SUCCESS, () => {
		expect(userReducer(undefined, Actions.getListingSuccess(listingPayload))).toEqual({
			2: { _id: 2 }
		});
	});

	test(Actions.GET_AGENT_PAYLOAD_SUCCESS, () => {
		expect(userReducer(undefined, Actions.getAgentPayloadSuccess(agentPayload))).toEqual({
			0: { _id: 0, bids: [1, 11] },
			5: { _id: 5 },
			15: { _id: 15 }
		});
	});

	test(Actions.GET_SELLER_PAYLOAD_SUCCESS, () => {
		expect(userReducer(undefined, Actions.getSellerPayloadSuccess(sellerPayload))).toEqual({
			0: { _id: 0, listings: [1, 2] },
			10: { _id: 10 },
			11: { _id: 11 }
		});
	});

	test(Actions.ADD_LISTING_SUCCESS, () => {
		expect(userReducer({ 0: { _id: 0, listings: [1, 2] }}, Actions.addListingSuccess({
			_id: 3,
			user: 0
		}))).toEqual({ 0: { _id: 0, listings: [1, 2, 3] } });
	});

	test(Actions.DELETE_BID_SUCCESS, () => {
		expect(userReducer({ 0: { _id: 0, bids: [2, 3] }, 1: { _id: 1, bids: [4, 5] } }, Actions.deleteBidSuccess(3))).toEqual({
			0: { _id: 0, bids: [2] },
			1: { _id: 1, bids: [4, 5] }
		});
	});

	test(Actions.DELETE_LISTING_SUCCESS, () => {
		expect(userReducer({ 0: { _id: 0, listings: [2, 3] }, 1: { _id: 1, listings: [4, 5] } }, Actions.deleteListingSuccess(3))).toEqual({
			0: { _id: 0, listings: [2] },
			1: { _id: 1, listings: [4, 5] }
		});
	});
});

describe('bidReducer', () => {
	test('initial', () => expect(bidReducer(undefined, {})).toEqual({}));
	
	test(Actions.ADD_BID_SUCCESS, () => {
		expect(bidReducer(undefined, Actions.addBidSuccess({ _id: 0 }))).toEqual({ 0: { _id: 0 } })
	});
	
	test(Actions.GET_SELLER_PAYLOAD_SUCCESS, () => {
		expect(bidReducer(undefined, Actions.getSellerPayloadSuccess(sellerPayload))).toEqual({
			70: { _id: 70, user: 10 },
			71: { _id: 71, user: 11 }
		});
	});
	
	test(Actions.GET_AGENT_PAYLOAD_SUCCESS, () => {
		expect(bidReducer(undefined, Actions.getAgentPayloadSuccess(agentPayload))).toEqual({
			1: { _id: 1, listing: 2 },
			11: { _id: 11, listing: 12 }
		});
	});
	
	test(Actions.GET_LISTING_SUCCESS, () => {
		expect(bidReducer(undefined, Actions.getListingSuccess(listingPayload))).toEqual({
			1: { _id: 1, user: 2 }
		});
	});
	
	test(Actions.UPDATE_BID_SUCCESS, () => {
		expect(bidReducer({ 0: { _id: 0, status: 'a' } }, Actions.updateBidSuccess({ _id: 0, status: 'b'}))).toEqual({
			0: { _id: 0, status: 'b' }
		});
	});

	test(Actions.DELETE_BID_SUCCESS, () => {
		expect(bidReducer({ 0: { _id: 0 }, 1: { _id: 1 } }, Actions.deleteBidSuccess(1))).toEqual({
			0: { _id: 0 }
		});
	});
});

describe('listingReducer', () => {
	test('initial', () => expect(listingReducer(undefined, {})).toEqual({}));

	test(Actions.ADD_LISTING_SUCCESS, () => {
		expect(listingReducer(undefined, Actions.addListingSuccess({ _id: 0 }))).toEqual({ 0: { _id: 0 } })
	});

	test(Actions.GET_LISTING_SUCCESS, () => {
		expect(listingReducer(undefined, Actions.getListingSuccess(listingPayload))).toEqual({
			0: { _id: 0, bids: [1] }
		});
	});

	test(Actions.GET_AGENT_PAYLOAD_SUCCESS, () => {
		expect(listingReducer(undefined, Actions.getAgentPayloadSuccess(agentPayload))).toEqual({
			2: { _id: 2, user: 5 },
			12: { _id: 12, user: 15 }
		});
	});
	
	test(Actions.GET_SELLER_PAYLOAD_SUCCESS, () => {
		expect(listingReducer(undefined, Actions.getSellerPayloadSuccess(sellerPayload))).toEqual({
			1: { _id: 1, bids: [70] },
			2: { _id: 2, bids: [71] }
		});
	});

	test(Actions.ADD_BID_SUCCESS, () => {
		expect(listingReducer({ 0: { _id: 0, bids: [1, 2] } }, Actions.addBidSuccess({ _id: 3, listing: 0 }))).toEqual({
			0: { _id: 0, bids: [1, 2, 3] }
		});
	});

	test(Actions.DELETE_LISTING_SUCCESS, () => {
		expect(listingReducer({ 0: { _id: 0 }, 1: { _id: 1 } }, Actions.deleteListingSuccess(0))).toEqual({
			1: { _id: 1 }
		});
	});

	test(Actions.DELETE_BID_SUCCESS, () => {
		expect(listingReducer({ 0: { _id: 0, bids: [2, 3] }, 1: { _id: 1, bids: [4, 5] } }, Actions.deleteBidSuccess(2))).toEqual({
			0: { _id: 0, bids: [3] },
			1: { _id: 1, bids: [4, 5] }
		});
	});
});