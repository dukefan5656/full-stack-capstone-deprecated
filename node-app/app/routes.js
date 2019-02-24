module.exports = function(app, passport) {
  const { User, Listing, Bid } = require("./models/user")(app.locals.db);

  app.get("/", function(req, res) {
    res.send("hello");
  });

  app.get("/sellerProfile", isLoggedIn, (req, res, next) => {
    console.log(req.session.passport.user);
    let user = req.user;
    let userID = req.user._id;
    //query the user and it will populate
    Listing.find({ _id: { $in: user.listing } })
      .populate("listing")
      .then(listing => {
        res.json({
          user
        });
      })
      .catch(next);
  });

  app.get("/agentProfile", isLoggedIn, (req, res, next) => {
    let user = req.user;
    let userId = req.user._id;
    Bid.find({ _id: { $in: user.bid } })
      .populate("bid")
      .then(bid => {
        res.json({ user });
      })
      .catch(next);
  });

  app.post("/createBid/:id", isLoggedIn, (req, res, next) => {
    for (const param of ["amount"]) {
      if (req.body[param] !== undefined && isNaN(Number(req.body[param]))) {
        return res.redirect("/sellerProfile");
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
        User.update({ bid: createdBid._id })
          .then(() => {
            console.log(listingID);
            return Listing.findById(listingID);
          })
          .then(listing => {
            console.log(listing.bids);
            // listing.bids.$.push(bidID); use $push
            res.json(newBid);
          })
          .catch(next);
      });
  });

  app.delete("/deleteListing/:id", isLoggedIn, (req, res, next) => {
    let id = req.params.id;
    Listing.findByIdAndRemove(id)
      .then(() => {
        res.redirect("/sellerProfile");
      })
      .catch(next);
  });

  app.post("/createListing", isLoggedIn, (req, res, next) => {
    let userID = req.user._id;
    let listingID;
    let newListing = {
      headline: req.body.headline,
      address: {
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        state: req.body.state
      },
      bids: [],
      user: userID,
      type: req.body.type,
      bed: req.body.bed,
      bath: req.body.bath,
      footage: req.body.footage,
      description: req.body.description
    };
    Listing.create(newListing)
      .then(listing => {
        listingID = listing._id;
        return (newListing = listing);
      })
      .then(() => {
        return User.findByIdAndUpdate(userID, {
          $set: { listing: listingID, type: "agent" }
        });
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
    res.redirect("/sellerProfile");
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/sellerProfile",
      failureRedirect: "/signup",
      failureFlash: true
    })
  );

  // SIGNUP =================================
  app.get("/signup", function(req, res) {
    res.redirect("/sellerProfile");
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/sellerProfile",
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
