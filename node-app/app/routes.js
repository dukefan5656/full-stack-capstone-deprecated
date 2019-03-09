module.exports = function(app, passport) {
  const { User, Listing, Bid } = require("./models/user")(app.locals.db);

  app.get("/", function(req, res) {
    res.send("hello");
  });

  app.get('/listing/:id', (req, res, next) => {
    Listing.findById(req.params.id)
    .populate({path: "bids",
               populate: {path: "user", select: "local"}})
    .then(listing => {
      console.log(listing);
      return res.json({listing})
    })
    .catch(next);
  })



  app.post('/listings', (req, res, next) => {
    let query = {};

    if(req.body.city){
      query.city = req.body.city;
    }
    if(req.body.zip){
      query.zip = req.body.zip;
    }
    if(req.body.type){
      query.type = req.body.type;
    }
    console.log(query);
    Listing.find(query)
    .then(listings => {
      console.log(listings);
      return res.json(
        listings
      )
    })
    .catch(next);
  })

  app.get("/seller_profile", isLoggedIn, (req, res, next) => {
    console.log("inside seller route");
    let user = req.session.passport.user;

  User.findOne({ _id: { $in: user } })
    .populate({path: "listings",
    populate: {path: "bids", populate: { path: 'user' }}})
      .then(user => {
        console.log(user);
        return res.json({
          user
        });
      })
      .catch(next);
  });

  app.get("/agent_profile", (req, res, next) => {
    let user = req.session.passport.user;
    User.find({ _id: { $in: user} })
      .populate("bids")
      .then(bids => {
        res.json({ user, bids });
      })
      .catch(next);
  });

  app.post("/createBid/:id", (req, res, next) => {
    for (const param of ["amount"]) {
      if (req.body[param] !== undefined && isNaN(Number(req.body[param]))) {
        return res.redirect("/seller_profile");
      }
    }
    let newBid = {
      amount: req.body.amount,
      listing: req.params.id,
      user: req.user._id
    };
    console.log(newBid);
    Bid.create(newBid)
      .then(bid => {
        newBid = bid;   
        return User.findById(req.session.passport.user)
      })
      .then(userToUpdate => {
        userToUpdate.bids.push(newBid._id);
        userToUpdate.save()
      return Listing.findById(newBid.listing)
      })
      .then(listingToUpdate => {
        listingToUpdate.bids.push(newBid._id);
        listingToUpdate.save()
      })
      .then(() => {
        return res.json(newBid)
      })
      .catch(next);
      });

  app.delete("/listings/:id", isLoggedIn, (req, res, next) => {
    let id = req.params.id;
    console.log(req.params);
    Listing.findByIdAndRemove(id)
      .then(() => {
    User.update({$pull: {listings : {$in:[id]}}})
      .then(() => {
        res.json();
      })
        
      })
      .catch(next);
  });

  app.delete("/bids/:id", isLoggedIn, (req, res, next) => {
    let id = req.params.id;
    console.log(req.params);
    Bid.findByIdAndRemove(id)
      .then(() => {
    User.update({$pull: {bids : {$in:[id]}}})
      .then(() => {
        res.json();
      })
        
      })
      .catch(next);
  });

  app.post("/createListing", isLoggedIn, (req, res, next) => {
    let newListing = {
      headline: req.body.headline,
      street: req.body.street,
      zip: req.body.zip,
      city: req.body.city,
      state: req.body.state,
      bids: [],
      user: req.session.passport.user,
      type: req.body.type,
      bed: req.body.bed,
      bath: req.body.bath,
      footage: req.body.footage,
      description: req.body.description
    };
    Listing.create(newListing)
      .then((listing) => {
        newListing = listing;
        return User.findById(req.session.passport.user)
      })
      .then(userToUpdate => {
        userToUpdate.listings.push(newListing._id)
        userToUpdate.save()
        return res.json(newListing);
      })
      .catch(next);
  });

  app.put("/updateListing/:id", isLoggedIn, (req, res, next) => {
    const ListingEditFields = [
      "headline",
      "address",
      "street",
      "zip",
      "city",
      "zip",
      "bed",
      "bath",
      "footage",
      "description",
      "notes",
      "booked"
    ];

    let ListingToUpdate = {};

    ListingEditFields.forEach(editedFields => {
      if (editedFields in req.body) {
        ListingToUpdate[editedFields] = req.body[editedFields];
      }
    });
    Listing.findOne({ _id: req.params.id })
      .catch(() => null)
      .then(listing => {
        if (!listing) return;
        return listing.update({ $set: ListingToUpdate });
      })
      .then(updatedListing => {
        res.json(updatedListing);
      });
  });

  // LOGOUT ==============================
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // AUTHENTICATE ================================================================

  // LOGIN ===============================
  app.get("/login", function(req, res) {
    res.redirect("/seller_profile");
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/seller_profile",
      failureRedirect: "/signup",
      failureFlash: true
    })
  );

  // SIGNUP =================================
  app.get("/signup", function(req, res) {
    res.redirect("/seller_profile");
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/seller_profile",
      failureRedirect: "/signup",
      failureFlash: true
    })
  );

  app.get("/connect/local", function(req, res) {
    res.redirect("/sellerProfile");
  });
  app.post(
    "/connect/local",
    passport.authenticate("local-signup", {
      successRedirect: "/sellerProfile",
      failureRedirect: "/connect/local",
      failureFlash: true
    })
  );

  // local -----------------------------------
  app.get("/unlink/local", isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect("/profile");
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
