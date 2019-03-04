module.exports = function(app, passport) {
  const { User, Listing, Bid } = require("./models/user")(app.locals.db);

  app.get("/", function(req, res) {
    res.send("hello");
  });

  app.get('/listing/:id', (req, res, next) => {
    Listing.findOne({_id: {$in: req.params.id}})
    .populate("listing")
    .then(listing => {
      console.log(listing);
      return res.json({listing})
    })
    .catch(next);
  })

  app.get("/seller_profile", isLoggedIn, (req, res, next) => {
    console.log(req.session.passport.user);
    let user = req.session.passport.user;

    // let userID = req.user._id;
    //query the user and it will populate
  User.find({ _id: { $in: /*user.listing*/user } })
      .populate("listings")
      .then(listings => {
        return res.json({
          user, listings
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
    let listingID = req.params.id;
    let newBid = {
      amount: req.body.amount
    };
    Bid.create(newBid)
      .then(bid => {
        bidID = bid._id;
        return (newBid = bid);
      })
      .then(createdBid => {
        console.log('this is the bid', newBid)
        return User.findById(req.session.passport.user)
      })
      .then(userToUpdate => {
        console.log('this is the user', userToUpdate.bids);
        userToUpdate.bids.push(bidID)
        userToUpdate.save()
      })
      .then(() => {
        res.json(newBid)
      })
      .catch(next);
      });

  app.delete("/deleteListing/:id", isLoggedIn, (req, res, next) => {
    let id = req.params.id;
    Listing.findByIdAndRemove(id)
      .then(() => {
        res.redirect("/seller_profile");
      })
      .catch(next);
  });

  app.post("/createListing", isLoggedIn, (req, res, next) => {
    
    let newListing = {
      headline: req.body.headline,
      address: {
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        state: req.body.state
      },
      bids: [],
      user: req.session.passport.user,
      type: req.body.type,
      bed: req.body.bed,
      bath: req.body.bath,
      footage: req.body.footage,
      description: req.body.description
    };
    console.log('something');
    Listing.create(newListing)
      .then((listing) => {
        console.log('working');

        listingID = listing._id;
        return (newListing = listing);
      })
      .then(listing => {
        return User.findById(req.session.passport.user)
      })
      .then(userToUpdate => {
        console.log('this is the user to update', userToUpdate.listings);
        userToUpdate.listings.push(listingID)
        userToUpdate.save()
      })
      .then(() => {
        res.json(newListing);
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
