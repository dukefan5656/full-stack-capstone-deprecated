const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');


const userSchema = mongoose.Schema({
    local: {
    email: String,
    password: String,
    },
    issuedAt: Date,
    firstName: String,
    lastName: String,
    type: String,
    listings: [{type: mongoose.Schema.Types.ObjectId,
                 ref: "Listing"}],
    bids: [{type: mongoose.Schema.Types.ObjectId,
    ref: "Bid"}],
},{usePushEach: true});

const listingSchema = mongoose.Schema ({
    headline: String,
    street:  String,
    zip: String,
    city: String,
    state: String,
    type: String,
    user: {type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    bids: [{type: mongoose.Schema.Types.ObjectId,
      ref: "Bid"}],
    bed: Number,
    bath: Number,
    footage: Number,
    image: String,
    description: String,
    issuedAt: Date,
    expiresAt: Date,
    deleted: {
      deletedDate: Date,
      is: Boolean
    },
    status: String
  },{usePushEach: true});

  const bidSchema = mongoose.Schema ({
    user: {type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    listing: {type: mongoose.Schema.Types.ObjectId,
      ref: "Listing"
    },
    amount: Number,
    createdAt: Date,
    status: String
  },{usePushEach: true});


  userSchema.pre('find',function(next){
    this.populate('listing');
    this.populate('bids');
    next();
  });

  const getOrCreate = (db, name, schema) => db.models[name] || db.model(name, schema);



// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to the app
module.exports = db => ({
                User: getOrCreate(db, 'User', userSchema), 
                Listing: getOrCreate(db, 'Listing', listingSchema), 
                Bid: getOrCreate(db, 'Bid', bidSchema)
});