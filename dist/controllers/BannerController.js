"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Banner = require("../models/Banner");

var _global = require("../global");

class BannerController {
  async create(request, response) {
    const {
      title,
      description
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(title, description);

    if (isAnyUndefined) return response.status(400).send();
    const newBanner = {
      title,
      description
    };
    const {
      httpStatus,
      message
    } = await _global.Citi.insertIntoDatabase(_Banner.Banner, newBanner);
    return response.status(httpStatus).send({
      message
    });
  }

  async get(request, response) {
    const {
      httpStatus,
      values
    } = await _global.Citi.getAll(_Banner.Banner);
    return response.status(httpStatus).send(values);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;
    const {
      value: bannerFound,
      message
    } = await _global.Citi.findByID(_Banner.Banner, id);
    if (!bannerFound) return response.status(400).send({
      message
    });
    const {
      httpStatus,
      messageFromDelete
    } = await _global.Citi.deleteValue(_Banner.Banner, bannerFound);
    return response.status(httpStatus).send({
      messageFromDelete
    });
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      title,
      description
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(title, description, id);

    if (isAnyUndefined) return response.status(400).send();
    const bannerWithUpdatedValues = {
      title,
      description
    };
    const {
      httpStatus,
      messageFromUpdate
    } = await _global.Citi.updateValue(_Banner.Banner, id, bannerWithUpdatedValues);
    return response.status(httpStatus).send({
      messageFromUpdate
    });
  }

}

exports.default = BannerController;