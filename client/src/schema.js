import {schema} from "normalizr";
const options = {idAttribute: "_id"};
export const User = new schema.Entity("users", {}, options);
export const Listing = new schema.Entity("listings", {}, options);
export const Bid = new schema.Entity("bids", {user: User, listing: Listing}, options);

User.define({bids: [Bid], listings: [Listing]})
Listing.define({bids: [Bid], user: User});