"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Projects = require("../models/Projects");

var _global = require("../global");

class ProjectsController {
  async create(request, response) {
    const {
      name,
      description,
      image,
      alt,
      link
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(name, description, image, link);

    if (isAnyUndefined) return response.status(400).send();
    const newProjects = {
      name,
      description,
      image,
      alt,
      link
    };
    const {
      httpStatus,
      message
    } = await _global.Citi.insertIntoDatabase(_Projects.Projects, newProjects);
    return response.status(httpStatus).send({
      message
    });
  }

  async get(request, response) {
    const {
      httpStatus,
      values
    } = await _global.Citi.getAll(_Projects.Projects);
    return response.status(httpStatus).send(values);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;
    const {
      value: projectsFound,
      message
    } = await _global.Citi.findByID(_Projects.Projects, id);
    if (!projectsFound) return response.status(400).send({
      message
    });
    const {
      httpStatus,
      messageFromDelete
    } = await _global.Citi.deleteValue(_Projects.Projects, projectsFound);
    return response.status(httpStatus).send({
      messageFromDelete
    });
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      name,
      description,
      image,
      alt,
      link
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(name, description, image, link);

    if (isAnyUndefined) return response.status(400).send();
    const projectsWithUpdatedValues = {
      name,
      description,
      image,
      alt,
      link
    };
    const {
      httpStatus,
      messageFromUpdate
    } = await _global.Citi.updateValue(_Projects.Projects, id, projectsWithUpdatedValues);
    return response.status(httpStatus).send({
      messageFromUpdate
    });
  }

}

exports.default = ProjectsController;