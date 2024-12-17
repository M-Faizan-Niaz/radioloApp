/** @format */

const express = require("express");
const caseController = require("./../controllers/caseController");

const router = express.Router();

router
  .route("/")
  .get(caseController.getAllCases)
  .post(caseController.createCases);

router
  .route("/:id")
  .get(caseController.getCase)
  .patch(caseController.updateCase)
  .delete(caseController.deleteCase);

module.exports = router;
