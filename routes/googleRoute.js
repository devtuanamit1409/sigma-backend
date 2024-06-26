import express from "express";
import passport from "passport";

const router = express.Router();

// Initialize Google OAuth login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handle the callback after Google has authenticated the user
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/profile",
    failureRedirect: "http://localhost:5173/login",
  })
);

// Route for successful login
router.get("/login/success", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: "User Logged In", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

// Route for logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173");
  });
});

export default router;
