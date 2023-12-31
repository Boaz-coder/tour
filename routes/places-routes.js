const express = require("express");
const { check } = require("express-validator");

const {
  getPlaceById,
  getPlacesByUserId,
  updatePlace,
  deletePlace,
  createPlace,
} = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router
  .route("/:pid")
  .patch(
    [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
    updatePlace
  )
  .delete(deletePlace);

module.exports = router;
