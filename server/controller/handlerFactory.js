const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const ApiFeatures = require("../utils/ApiFeatures");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @desc  create document of the model
 */
exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(200).json(new ApiResponse("document created", document, "OK"));
  });

/**
 * @desc get all document of the model and apply api features
 */
exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res.status(200).json(
      new ApiResponse(
        "",
        {
          numberOfDocuments: documentsCounts,
          paginationResult,
          data: documents,
        },
        "OK"
      )
    );
  });

/**
 * @desc get document of the model by id
 */
exports.getById = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);

    if (populationOpt) {
      query = query.populate(populationOpt);
    }

    const document = await query;

    if (!document)
      return next(new ApiError(`No document for this id ${id}`, 404));

    res.status(200).json(new ApiResponse("", document, "OK"));
  });

/**
 * @desc update document of the model by id
 */
exports.updateById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!document)
      return next(new ApiError(`No document for this id ${id}`, 404));

    res
      .status(200)
      .json(new ApiResponse(`Successfully updated`, document, "OK"));
  });

/**
 * @desc delete document of the model by id
 */
exports.deleteById = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document)
      return next(new ApiError(`No document for this id ${id}`, 404));

    res.status(204).json({ success: true });
  });
