import { mockStore } from '../setupTests';
import * as Actions from './index';
import history from '../history';


const clearDB = () => fetch('http://localhost:8080/cleardb', { credentials: 'include' }).then(response => {
	return response.ok ? Promise.resolve() : Promise.reject(response.status);
});

const signup = (email, password, type) =>  fetch(`http://localhost:8080/signup`, {
	method: "POST",
	credentials: "include",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		email,
		password,
		type
	})
})
.then(res => {
	if (res.url === "http://localhost:8080/seller_profile") {
		return res.json();
	} else {
		throw new Error("invalid login");
	}
});

const login = (email, password) => fetch(`http://localhost:8080/login`, {
	credentials: "include",
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		email,
		password
	})
}).then(res => {
	if (res.url === "http://localhost:8080/seller_profile") {
		return res.json();
	} else {
		throw new Error("invalid login");
	}
});

const logout = () => fetch(`http://localhost:8080/logout`, {
	credentials: "include",
	method: "GET",
	headers: {
		"Content-Type": "application/json"
	}
});

const addListing = (args) => fetch("http://localhost:8080/createListing", {
	method: "POST",
	credentials: "include",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(args)
}).then(res => {
	if (res.headers.get("Content-Type").includes("application/json")) {
		if (res.ok) {
			return res.json();
		}

		return res.json().then(json => {
			throw Error("API: " + JSON.stringify(json));
		});
	}

	return res.text().then(text => {
		throw Error("HTTP " + res.status + " : " + text);
	});
});

const addBid = (id, amount) => fetch("http://localhost:8080/createBid/" + id, {
	method: "POST",
	credentials: "include",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify({ amount })
}).then(res => {
	if (res.headers.get("Content-Type").includes("application/json")) {
		if (res.ok) {
			return res.json();
		}
		return res.json().then(json => {
			throw Error("API: " + JSON.stringify(json));
		});
	}
	return res.text().then(text => {
		throw Error("HTTP " + res.status + " : " + text);
	});
});


describe('SIGNUP', () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		const store = mockStore();
		history.push = jest.fn();
		
		store.dispatch(Actions.signupSuccess({ user: { _id: 'id', type: 'type', local: { email: 'em', } }}))

		expect(store.getActions()).toEqual([{
			type: Actions.SIGN_UP_SUCCESS, email: 'em', userType: 'type', user: 'id'
		}]);
		expect(history.push).toBeCalledWith('/profile');
	});

	test('FAILURE', () => {
		expect(Actions.signupFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.SIGN_UP_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();
			history.push = jest.fn();

			return store.dispatch(Actions.signup('email', 'password', 'type')).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.SIGN_UP_REQUEST,
					email: 'email',
					userType: 'type'
				}, {
					type: Actions.SIGN_UP_SUCCESS,
					email: 'email',
					userType: 'type'
				}]);
				expect(actions[1]).toHaveProperty('user');
				expect(history.push).toBeCalledWith('/profile');
			});
		});
		test('FAILURE', () => {
			const store = mockStore();
			return store.dispatch(Actions.signup('email', 'password', 'type')).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.SIGN_UP_REQUEST,
					email: 'email',
					userType: 'type'
				}, {
					type: Actions.SIGN_UP_FAILURE,
				}]);
				expect(actions[1]).toHaveProperty('message');
			});
		});
	});
});

describe('LOG_IN', () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		const store = mockStore();
		history.push = jest.fn();

		store.dispatch(Actions.logInSuccess({ user: { _id: 'id', type: 'type', local: { email: 'em', } }}))

		expect(store.getActions()).toEqual([{
			type: Actions.LOG_IN_SUCCESS, email: 'em', userType: 'type', user: 'id'
		}]);
		expect(history.push).toBeCalledWith('/profile');
	});

	test('FAILURE', () => {
		expect(Actions.logInFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.LOG_IN_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();
			history.push = jest.fn();

			return signup('email', 'password', 'type').then(() => 
				store.dispatch(Actions.logIn('email', 'password'))
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.LOG_IN_REQUEST,
					email: 'email'
				}, {
					type: Actions.LOG_IN_SUCCESS,
					email: 'email',
					userType: 'type'
				}]);
				expect(actions[1]).toHaveProperty('user');
				expect(history.push).toBeCalledWith('/profile');
			});
		});
		test('FAILURE', () => {
			const store = mockStore();
			return store.dispatch(Actions.logIn('doesnt', 'exist')).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.LOG_IN_REQUEST,
					email: 'doesnt'
				}, {
					type: Actions.LOG_IN_FAILURE,
				}]);
				expect(actions[1]).toHaveProperty('message');
			});
		});
	});
});

describe('ADD_LISTING', () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		const store = mockStore();

		store.dispatch(Actions.addListingSuccess({
			_id: 'lid',
			prop: 'val',
			bids: [],
			user: 'uid'
		}));

		expect(store.getActions()).toEqual([{
			type: Actions.ADD_LISTING_SUCCESS,
			id: 'lid',
			entities: {
				listings: {
					lid: {
						_id: 'lid',
						prop: 'val',
						bids: [],
						user: 'uid'
					}
				}
			}
		}]);
	});

	test('FAILURE', () => {
		expect(Actions.addListingFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.ADD_LISTING_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('Agent can\'t create listings', () => {
			const store = mockStore();

			return signup('fail to create', 'listing', 'agent').then(() => 
				store.dispatch(Actions.addListing({ headline: 'hl' }))
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.ADD_LISTING_REQUEST,
					args: { headline: 'hl' }
				}, {
					type: Actions.ADD_LISTING_FAILURE
				}]);
				expect(actions[1].message.message).toMatch('API: {"message":"You are not a seller"}')
			});
		});

		test('fields must be their correct type', () => {
			const store = mockStore();

			const args = {
				headline: 124,
				bath: 'b',

			};
			return signup('invalid field create', 'listing', 'seller').then(() => 
				store.dispatch(Actions.addListing(args))
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.ADD_LISTING_REQUEST, args
				}, {
					type: Actions.ADD_LISTING_FAILURE
				}]);
				expect(actions[1].message.message).toMatch(/HTTP 500(.|\n)*ValidationError/)
			});
		});

		test('SUCCESS', () => {
			const store = mockStore();

			const args = {
				headline: 'hl',
				street: '1234',
				zip: 'zip',
				city: 'city',
				state: 'state',
				type: 'type',
				bed: 0,
				bath: 1,
				footage: 2,
				description: 'desc',
			};
			let userID = null;
			return signup('create', 'listing', 'seller').then(json => {
				userID = json.user._id;
				return store.dispatch(Actions.addListing(args))
			}).then(() => {
				const [request, success] = store.getActions();

				expect(request).toEqual({ type: Actions.ADD_LISTING_REQUEST, args });

				const id = success.id;
				expect(success).toEqual({
					type: Actions.ADD_LISTING_SUCCESS,
					entities: {
						listings: {
							[id]: {
								...args,
								__v: 0,
								_id: id,
								bids: [],
								user: userID,
								image: "./styles/images/condo-1.jpg",
							}
						}
					},
					id: id
				});
			});
		});
	});
});

describe('ADD_BID', () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		const store = mockStore();

		store.dispatch(Actions.addBidSuccess({
			_id: 'bid',
			status: 'pending',
			user: 'uid',
			listing: 'lid',
			amount: 0
		}));

		expect(store.getActions()).toEqual([{
			type: Actions.ADD_BID_SUCCESS,
			id: 'bid',
			entities: {
				bids: {
					bid: {
						_id: 'bid',
						status: 'pending',
						user: 'uid',
						listing: 'lid',
						amount: 0
					}
				}
			}
		}]);
	});

	test('FAILURE', () => {
		expect(Actions.addBidFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.ADD_BID_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();

			let userID = null;
			let listingID = null;
			return signup('add listing', 'for bid', 'seller').then(() =>
				addListing({})
			).then(json => {
				listingID = json._id;
				return signup('add', 'bid', 'agent');
			}).then(json => {
				userID = json.user._id;
				return store.dispatch(Actions.addBid(1234, listingID))
			}).then(() => {
				const [request, success] = store.getActions();
				expect(request).toEqual({
					type: Actions.ADD_BID_REQUEST,
					amount: 1234,
					id: listingID
				})
				
				const id = success.id;
				expect(success).toEqual({
					type: Actions.ADD_BID_SUCCESS,
					id,
					entities: {
						bids: { [id]: {
								__v: 0,
								_id: id,
								amount: 1234,
								user: userID,
								status: 'pending',
								listing: listingID
						} }
					}
				});
			});
		});

		test('FAILURE', () => {
			const store = mockStore();

			return signup('add failing', 'bid', 'agent').then(() =>
				store.dispatch(Actions.addBid(1234, 'lid'))
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.ADD_BID_REQUEST,
					amount: 1234,
					id: 'lid'
				}, {
					type: Actions.ADD_BID_FAILURE
				}]);
				expect(actions[1]).toHaveProperty('message');
			});
		});
	});
});

describe('UPDATE_BID', () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		const store = mockStore();

		store.dispatch(Actions.updateBidSuccess({
			_id: 'bid',
			status: 'newstatus',
			user: 'uid',
			listing: 'lid',
			amount: 3
		}));

		expect(store.getActions()).toEqual([{
			type: Actions.UPDATE_BID_SUCCESS,
			entities: {
				bids: {
					bid: {
						_id: 'bid',
						status: 'newstatus',
						user: 'uid',
						listing: 'lid',
						amount: 3
					}
				}
			}
		}]);
	});

	test('FAILURE', () => {
		expect(Actions.updateBidFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.UPDATE_BID_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();

			let userID = null;
			let listingID = null;
			let bidID = null;
			return signup('add listing', 'for bid update', 'seller').then(() =>
				addListing({})
			).then(json => {
				listingID = json._id;
				return signup('update', 'bid', 'agent');
			}).then(json => {
				userID = json.user._id;
				return addBid(listingID, 976);
			}).then(json => {
				bidID = json._id
				return store.dispatch(Actions.updateBid(bidID, 'newstatus'));
			}).then(() => {
				const [request, success] = store.getActions();
				expect(request).toEqual({
					type: Actions.UPDATE_BID_REQUEST,
					id: bidID,
					status: 'newstatus'
				})
				
				expect(success).toEqual({
					type: Actions.UPDATE_BID_SUCCESS,
					entities: { bids: { [bidID]: { 
						__v: 0,
						_id: bidID,
						amount: 976,
						listing: listingID,
						status: 'newstatus',
						user: userID
					} } }
				});
			});
		});

		test('FAILURE', () => {
			const store = mockStore();

			return signup('update fail', 'bid', 'agent').then(() =>
				store.dispatch(Actions.updateBid(1234, 'newstatus'))
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.UPDATE_BID_REQUEST,
					id: 1234,
					status: 'newstatus'
				}, {
					type: Actions.UPDATE_BID_FAILURE
				}]);
				expect(actions[1]).toHaveProperty('message');
			});
		});
	});
});

describe('GET_LISTING', () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		const store = mockStore();

		store.dispatch(Actions.getListingSuccess({ listing: {
			_id: 'lid',
			user: {
				_id: 'sid'
			},
			headline: 'hl',
			bids: [{
				_id: 'bid_1',
				user: { _id: 'aid_1', local: {} }
			}, {
				_id: 'bid_2',
				user: { _id: 'aid_2', local: {} },
				amount: 493
			}]
		} }));

		expect(store.getActions()).toEqual([{
			type: Actions.GET_LISTING_SUCCESS,
			entities: {
				bids: {
					bid_1: {
						_id: 'bid_1',
						user: 'aid_1'
					},
					bid_2: {
						_id: 'bid_2',
						user: 'aid_2',
						amount: 493
					}
				},
				listings: { lid: {
					_id: 'lid',
					headline: 'hl',
					bids: ['bid_1', 'bid_2'],
					user: 'sid'
				} },
				users: {
					sid: { _id: 'sid' },
					aid_1: { _id: 'aid_1', local: {} },
					aid_2: { _id: 'aid_2', local: {} }
				}
			}
		}]);
	});

	test('FAILURE', () => {
		expect(Actions.getListingFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.GET_LISTING_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();

			let sellerID = null;
			let agentID = null;
			let listingID = null;
			let bids = null;
			return signup('add listing', 'for listing get', 'seller').then(json => {
				sellerID = json.user._id;
				return addListing({})
			}).then(json => {
				listingID = json._id;
				return signup('get', 'listing', 'agent');
			}).then(json => {
				agentID = json.user._id;
				bids = [];
				return addBid(listingID, 123).then(bid => {
					bids.push(bid);
					return addBid(listingID, 456)
				}).then(bid => {
					bids.push(bid);
				});
			}).then(() => 
				store.dispatch(Actions.getListing(listingID))
			).then(() => {
				const [request, success] = store.getActions();
				expect(request).toEqual({
					type: Actions.GET_LISTING_REQUEST,
					id: listingID,
				});

				const bidIDs = bids.map(bid => bid._id);
				// TODO - Change to toEquals once passwords are remove from payload
				expect(success).toMatchObject({
					type: Actions.GET_LISTING_SUCCESS,
					entities: {
						bids: { ...bids.reduce((obj, bid) => ({ ...obj, [bid._id]: bid }), {}) },
						listings: { [listingID]: {
							__v: 2,
							_id: listingID,
							bids: bidIDs,
							image: './styles/images/condo-1.jpg',
							user: sellerID
						} },
						users: {
							[sellerID]: {
								__v: 1,
								_id: sellerID,
								listings: [ listingID ],
								bids: [],
								type: 'seller',
								local: { email: 'add listing' }
							},
							[agentID]: {
								_id: agentID,
								bids: bidIDs,
								local: { email: 'get' }
							}
						}
					}
				});
			});
		});

		test('FAILURE', () => {
			const store = mockStore();

			return signup('get listing fail', 'pw', 'agent').then(() => 
				store.dispatch(Actions.getListing(1234))
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.GET_LISTING_REQUEST,
					id: 1234
				}, {
					type: Actions.GET_LISTING_FAILURE
				}]);
				expect(actions[1]).toHaveProperty('message');
			});
		});
	});
});

describe(`GET_AGENT_PAYLOAD`, () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		const store = mockStore();

		store.dispatch(Actions.getAgentPayloadSuccess({ user: {
			_id: 'uid',
			bids: [{
				_id: 'bid',
				listing: { _id: 'lid', user: { _id: 'ulid' } }
			}]
		} }));

		expect(store.getActions()).toEqual([{
			type: Actions.GET_AGENT_PAYLOAD_SUCCESS,
			entities: {
				bids: {
					bid: {
						_id: 'bid',
						listing: 'lid',
					},
				},
				listings: {
					lid: {
						_id: 'lid',
						user: 'ulid',
					},
				},
				users: {
					uid: {
						_id: 'uid',
						bids: [ 'bid' ]
					},
					ulid: { _id: 'ulid' },
				}
			}
		}]);
	});

	test('FAILURE', () => {
		expect(Actions.getAgentPayloadFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.GET_AGENT_PAYLOAD_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();

			let sellerID = null;
			let listingID = null;
			let agentID = null;
			let bid = null;
			return signup('add listing', 'for agent payload', 'seller').then(json => {
				sellerID = json.user._id;
				return addListing({});
			}).then(json => {
				listingID = json._id;
				return signup('agent', 'payload', 'agent');
			}).then(json => {
				agentID = json.user._id;
				return addBid(listingID, 123);
			}).then(json => {
				bid = json;
				return store.dispatch(Actions.getAgentPayload());
			}).then(() => {
				const [request, success] = store.getActions();
				expect(request).toEqual({
					type: Actions.GET_AGENT_PAYLOAD_REQUEST
				});

				expect(success).toMatchObject({
					type: Actions.GET_AGENT_PAYLOAD_SUCCESS,
					entities: {
						bids: { [bid._id]: bid },
						listings: { [listingID]: {
							__v: 1,
							_id: listingID,
							bids: [ bid._id ],
							image: './styles/images/condo-1.jpg',
							user: sellerID
						} },
						users: {
							[sellerID]: {
								_id: sellerID,
								listings: [ listingID ],
								bids: [],
								type: 'seller',
								local: { email: 'add listing' }
							},
							[agentID]: {
								_id: agentID,
								bids: [ bid._id ],
								listings: [],
								local: { email: 'agent' },
								type: 'agent'
							}
						}
					}
				});
			});
		});

		test('FAILURE', () => {
			const store = mockStore();

			return logout().then(() =>
				store.dispatch(Actions.getAgentPayload())
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.GET_AGENT_PAYLOAD_REQUEST
				}, {
					type: Actions.GET_AGENT_PAYLOAD_FAILURE
				}]);
				expect(actions[1]).toHaveProperty('message');
			});
		});
	});
});

describe(`GET_SELLER_PAYLOAD`, () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		const store = mockStore();

		store.dispatch(Actions.getSellerPayloadSuccess({ user: {
			_id: 'uid',
			listings: [{
				_id: 'lid',
				bids: [{ _id: 'bid', user: { _id: 'lbuid' } }]
			}]
		} }));

		expect(store.getActions()).toEqual([{
			type: Actions.GET_SELLER_PAYLOAD_SUCCESS,
			entities: {
				bids: {
					bid: {
						_id: 'bid',
						user: 'lbuid',
					},
				},
				listings: {
					lid: {
						_id: 'lid',
						bids: ['bid'],
					},
				},
				users: {
					uid: {
						_id: 'uid',
						listings: [ 'lid' ]
					},
					lbuid: { _id: 'lbuid' },
				}
			}
		}]);
	});

	test('FAILURE', () => {
		expect(Actions.getSellerPayloadFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.GET_SELLER_PAYLOAD_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();

			let sellerID = null;
			let listingID = null;
			let agentID = null;
			let bid = null;
			return signup('add listing', 'for seller payload', 'seller').then(json => {
				sellerID = json.user._id;
				return addListing({});
			}).then(json => {
				listingID = json._id;
				return signup('agent', 'payload', 'agent');
			}).then(json => {
				agentID = json.user._id;
				return addBid(listingID, 123);
			}).then(json => {
				bid = json;
				return login('add listing', 'for seller payload');
			}).then(() => 
				store.dispatch(Actions.getSellerPayload())
			).then(() => {
				const [request, success] = store.getActions();
				expect(request).toEqual({
					type: Actions.GET_SELLER_PAYLOAD_REQUEST
				});

				expect(success).toMatchObject({
					type: Actions.GET_SELLER_PAYLOAD_SUCCESS,
					entities: {
						bids: { [bid._id]: bid },
						listings: { [listingID]: {
							__v: 1,
							_id: listingID,
							bids: [ bid._id ],
							image: './styles/images/condo-1.jpg',
							user: sellerID
						} },
						users: {
							[sellerID]: {
								_id: sellerID,
								listings: [ listingID ],
								bids: [],
								type: 'seller',
								local: { email: 'add listing' }
							},
							[agentID]: {
								_id: agentID,
								bids: [ bid._id ],
								listings: [],
								local: { email: 'agent' },
								type: 'agent'
							}
						}
					}
				});
			});
		});

		test('FAILURE', () => {
			const store = mockStore();

			return logout().then(() =>
				store.dispatch(Actions.getSellerPayload())
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.GET_SELLER_PAYLOAD_REQUEST
				}, {
					type: Actions.GET_SELLER_PAYLOAD_FAILURE
				}]);
				expect(actions[1]).toHaveProperty('message');
			});
		});
	});
});

describe('DELETE_LISTING', () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		expect(Actions.deleteListingSuccess('lid', [5, 6])).toEqual({
			type: Actions.DELETE_LISTING_SUCCESS,
			id: 'lid',
			bidIds: [5, 6]
		});
	});

	test('FAILURE', () => {
		expect(Actions.deleteListingFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.DELETE_LISTING_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();

			let listingID = null;
			return signup('delete', 'listing', 'seller').then(() => 
				addListing({})
			).then(json => {
				listingID = json._id;
				return store.dispatch(Actions.deleteListing(listingID, [1, 2]));
			}).then(() => {
				expect(store.getActions()).toEqual([
					{
						type: Actions.DELETE_LISTING_REQUEST,
						listingId: listingID,
						bidIds: [1, 2]
					},
					Actions.deleteBidSuccess(1),
					Actions.deleteBidSuccess(2),
					Actions.deleteListingSuccess(listingID, [1, 2])
				]);
			});
		});

		test('FAILURE', () => {
			const store = mockStore();

			return signup('fail delete', 'listing', 'seller').then(() => 
				store.dispatch(Actions.deleteListing(4567, [0, 4]))
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.DELETE_LISTING_REQUEST,
					listingId: 4567,
					bidIds: [0, 4]
				}, 
				Actions.deleteBidFailure(0),
				Actions.deleteBidFailure(4),
				{
					type: Actions.DELETE_LISTING_FAILURE
				}]);
				expect(actions[1]).toHaveProperty('message');
			});
		})
	});
});

describe('DELETE_BID', () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		expect(Actions.deleteBidSuccess('lid')).toEqual({
			type: Actions.DELETE_BID_SUCCESS,
			id: 'lid'
		});
	});

	test('FAILURE', () => {
		expect(Actions.deleteBidFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.DELETE_BID_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();

			let listingID = null;
			let bidID = null;
			return signup('delete', 'bid', 'seller').then(() =>
				addListing({})
			).then(json => {
				listingID = json._id;
				return signup('delete success', 'bid', 'agent');
			}).then(() => 
				addBid(listingID, 976)
			).then(json => {
				bidID = json._id
				return store.dispatch(Actions.deleteBid(bidID));
			}).then(() => {
				expect(store.getActions()).toEqual([
					{
						type: Actions.DELETE_BID_REQUEST,
						id: bidID
					},
					Actions.deleteBidSuccess(bidID)
				]);
			});
		});

		test('FAILURE', () => {
			const store = mockStore();

			return signup('fail delete', 'bid', 'seller').then(() => 
				store.dispatch(Actions.deleteBid(4567))
			).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.DELETE_BID_REQUEST,
					id: 4567
				}, {
					type: Actions.DELETE_BID_FAILURE
				}]);
				expect(actions[1]).toHaveProperty('message');
			});
		})
	});
});

describe('LOG_OUT', () => {
	beforeAll(() => clearDB());

	test('SUCCESS', () => {
		const store = mockStore();
		history.push = jest.fn();

		store.dispatch(Actions.logoutSuccess())

		expect(store.getActions()).toEqual([{
			type: Actions.LOG_OUT_SUCCESS
		}]);
		expect(history.push).toBeCalledWith('/');
	});

	test('FAILURE', () => {
		expect(Actions.logoutFailure('error as string')).toEqual({
			message: 'error as string',
			type: Actions.LOG_OUT_FAILURE
		});
	});

	describe('REQUEST', () => {
		test('SUCCESS', () => {
			const store = mockStore();
			history.push = jest.fn();

			return store.dispatch(Actions.logOut()).then(() => {
				const actions = store.getActions();
				expect(actions).toMatchObject([{
					type: Actions.LOG_OUT_REQUEST
				}, {
					type: Actions.LOG_OUT_SUCCESS
				}]);
				expect(history.push).toBeCalledWith('/');
			});
		});
	});
});