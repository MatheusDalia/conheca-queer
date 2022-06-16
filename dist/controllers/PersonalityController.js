"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Personality = require("../models/Personality");

var _global = require("../global");

class PersonalityController {
  async create(request, response) {
    const {
      image,
      title,
      description,
      email,
      youtube,
      instagram
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(image, title, description);

    if (isAnyUndefined) return response.status(400).send();
    const newPersonality = {
      image,
      title,
      description,
      email,
      youtube,
      instagram
    };
    const {
      httpStatus,
      message
    } = await _global.Citi.insertIntoDatabase(_Personality.Personality, newPersonality);
    return response.status(httpStatus).send({
      message
    });
  }

  async get(request, response) {
    const {
      httpStatus,
      values
    } = await _global.Citi.getAll(_Personality.Personality);
    return response.status(httpStatus).send(values);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;
    const {
      value: personalityFound,
      message
    } = await _global.Citi.findByID(_Personality.Personality, id);
    if (!personalityFound) return response.status(400).send({
      message
    });
    const {
      httpStatus,
      messageFromDelete
    } = await _global.Citi.deleteValue(_Personality.Personality, personalityFound);
    return response.status(httpStatus).send({
      messageFromDelete
    });
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    let {
      image,
      title,
      description,
      email,
      youtube,
      instagram
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(image, title, description, id);

    if (isAnyUndefined) return response.status(400).send();
    /* to make the put method more effective (considering we now have nullable columns), I made it so, if the
    nullable column is undefined, it is to be replaced with a null value, otherwise, this method would
    work like a patch (the undefined values would remain the same as they were before the put)*/

    const isAnyUndefined1 = _global.Citi.areValuesUndefined(email);

    if (isAnyUndefined1) email = null;

    const isAnyUndefined2 = _global.Citi.areValuesUndefined(youtube);

    if (isAnyUndefined2) youtube = null;

    const isAnyUndefined3 = _global.Citi.areValuesUndefined(instagram);

    if (isAnyUndefined3) instagram = null;
    const personalityWithUpdatedValues = {
      image,
      title,
      description,
      email,
      youtube,
      instagram
    };
    const {
      httpStatus,
      messageFromUpdate
    } = await _global.Citi.updateValue(_Personality.Personality, id, personalityWithUpdatedValues);
    return response.status(httpStatus).send({
      messageFromUpdate
    });
  }

}

exports.default = PersonalityController;