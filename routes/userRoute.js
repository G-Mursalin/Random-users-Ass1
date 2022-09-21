const express = require("express");
const {
  getARandomUser,
  getAllUsers,
  createAUser,
  updateAUser,
  deleteAUser,
  bulkUpdate,
  checkLimit,
  checkId,
  checkBody,
  checkBulkUpdateBody,
} = require("../controllers/userController");

const router = express.Router();

// Routers
router.route("/random").get(getARandomUser);
router.route("/all").get(checkLimit, getAllUsers);
router.route("/save").post(checkBody, createAUser);
router.route("/update/:id").patch(checkId, updateAUser);
router.route("/delete/:id").delete(checkId, deleteAUser);
router.route("/bulk-update").patch(checkBulkUpdateBody, bulkUpdate);

module.exports = router;
