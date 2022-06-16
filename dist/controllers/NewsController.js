"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _News = require("../models/News");

var _global = require("../global");

class NewsController {
  async create(request, response) {
    const {
      image,
      alt,
      title,
      text,
      link
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(image, title, text, link);

    if (isAnyUndefined) return response.status(400).send();
    const newNews = {
      image,
      alt,
      title,
      text,
      link
    };
    const {
      httpStatus,
      message
    } = await _global.Citi.insertIntoDatabase(_News.News, newNews);
    return response.status(httpStatus).send({
      message
    });
  }

  async get(request, response) {
    const {
      httpStatus,
      values
    } = await _global.Citi.getAll(_News.News);
    return response.status(httpStatus).send(values);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;
    const {
      value: newsFound,
      message
    } = await _global.Citi.findByID(_News.News, id);
    if (!newsFound) return response.status(400).send({
      message
    });
    const {
      httpStatus,
      messageFromDelete
    } = await _global.Citi.deleteValue(_News.News, newsFound);
    return response.status(httpStatus).send({
      messageFromDelete
    });
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      image,
      alt,
      title,
      text,
      link
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(image, title, text, link);

    if (isAnyUndefined) return response.status(400).send();
    const newsUpdatedValues = {
      image,
      alt,
      title,
      text,
      link
    };
    const {
      httpStatus,
      messageFromUpdate
    } = await _global.Citi.updateValue(_News.News, id, newsUpdatedValues);
    return response.status(httpStatus).send({
      messageFromUpdate
    });
  }

}

exports.default = NewsController;