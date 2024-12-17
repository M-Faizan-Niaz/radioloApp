/** @format */

const AppError = require("../utils/appError");
const Case = require("./../models/caseModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");

exports.getAllCases = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Case.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const cases = await features.query;

  res.status(200).json({
    status: "success",
    results: cases.length,
    data: {
      cases,
    },
  });
});

exports.getCase = catchAsync(async (req, res, next) => {
  const singleCase = await Case.findById(req.params.id);
  if (!singleCase) {
    return next(new AppError("No Case found !", 404));
  }
  res.status(200).json({
    status: "success",
    data: singleCase,
  });
});

exports.updateCase = catchAsync(async (req, res, next) => {
  const Case = await Case.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
  });

  if (!Case) {
    return next(new AppError("No case found ", 404));
  }

  res.status(200).json({
    status: "success",
    data: Case,
  });
});

exports.deleteCase = catchAsync(async (req, res, next) => {
  const deleteCase = await Case.findByIdAndDelete(req.params.id);

  if (!deleteCase) {
    return next(new AppError("No case found", 404));
  }
  res.status(204).json({
    status: "sucess",
    data: null,
  });
});

exports.createCases = catchAsync(async (req, res, next) => {
  const newCase = await Case.create(req.body);

  if (!newCase) {
    return next(new AppError("No Case Found", 404));
  }

  res.status(200).json({
    status: "success",
    data: newCase,
  });
});
