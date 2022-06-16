"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection = require("../database/connection");

var _Message = _interopRequireDefault(require("./Message"));

var _Terminal = _interopRequireDefault(require("./Terminal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-nocheck
class Citi {
  static areValuesUndefined(...elements) {
    const isAnyUndefined = elements.some(element => {
      return element === undefined;
    });
    return isAnyUndefined;
  }

  static async insertIntoDatabase(entity, object) {
    try {
      const entityRepository = _connection.connection.getRepository(entity);

      await entityRepository.save(object);

      _Terminal.default.show(_Message.default.INSERTED_IN_DATABASE);

      return {
        httpStatus: 201,
        message: _Message.default.INSERTED_IN_DATABASE
      };
    } catch (error) {
      _Terminal.default.show(_Message.default.ERROR_INSERTING_DATABASE);

      return {
        httpStatus: 400,
        message: _Message.default.ERROR_INSERTING_DATABASE
      };
    }
  }

  static async getAll(entity) {
    try {
      const entityRepository = _connection.connection.getRepository(entity);

      const repositoryValues = await entityRepository.find();

      _Terminal.default.show(_Message.default.GET_ALL_VALUES_FROM_DATABASE);

      return {
        values: repositoryValues,
        httpStatus: 200
      };
    } catch (error) {
      _Terminal.default.show(_Message.default.ERROR_GETTING_VALUES_FROM_DATABASE);

      return {
        values: [],
        httpStatus: 400
      };
    }
  }

  static async findByID(entity, id) {
    try {
      const entityID = Number(id);

      const entityRepository = _connection.connection.getRepository(entity);

      const valueFound = await entityRepository.find({
        where: {
          id: entityID
        }
      });
      if (valueFound.length === 0) throw new Error('Nao foi encontrado');

      _Terminal.default.show(_Message.default.VALUE_WAS_FOUND);

      return {
        value: valueFound[0],
        message: _Message.default.VALUE_WAS_FOUND
      };
    } catch (error) {
      _Terminal.default.show(_Message.default.VALUE_WAS_NOT_FOUND);

      return {
        value: undefined,
        message: _Message.default.VALUE_WAS_NOT_FOUND
      };
    }
  }

  static async deleteValue(entity, object) {
    try {
      const entityRepository = _connection.connection.getRepository(entity);

      await entityRepository.remove(object);

      _Terminal.default.show(_Message.default.VALUE_DELETED_FROM_DATABASE);

      return {
        httpStatus: 200,
        messageFromDelete: _Message.default.VALUE_DELETED_FROM_DATABASE
      };
    } catch (error) {
      _Terminal.default.show(_Message.default.ERROR_AT_DELETE_FROM_DATABASE);

      return {
        httpStatus: 400,
        messageFromDelete: _Message.default.ERROR_AT_DELETE_FROM_DATABASE
      };
    }
  }

  static async updateValue(repositoryType, id, object) {
    try {
      const entityID = Number(id);

      const entityRepository = _connection.connection.getRepository(repositoryType);

      const valueFound = await entityRepository.find({
        where: {
          id: entityID
        }
      });
      if (valueFound.length === 0) throw new Error("Não foi encontrado");
      await entityRepository.update(id, object);

      _Terminal.default.show(_Message.default.VALUE_WAS_UPDATED);

      return {
        httpStatus: 200,
        messageFromUpdate: _Message.default.VALUE_WAS_UPDATED
      };
    } catch (error) {
      _Terminal.default.show(_Message.default.ERROR_AT_UPDATE_FROM_DATABASE);

      return {
        httpStatus: 400,
        messageFromUpdate: _Message.default.ERROR_AT_UPDATE_FROM_DATABASE
      };
    }
  }

}

exports.default = Citi;