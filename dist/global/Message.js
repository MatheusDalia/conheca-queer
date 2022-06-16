"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Message {}

exports.default = Message;
Message.INSERTED_IN_DATABASE = "the value was INSERTED IN THE DATABASE";
Message.GET_ALL_VALUES_FROM_DATABASE = "get all the values from the database";
Message.VALUE_WAS_FOUND = "the values was FOUND BY ID";
Message.VALUE_DELETED_FROM_DATABASE = "the value was DELETED from DATABASE";
Message.VALUE_WAS_UPDATED = "the value was UPDATED";
Message.ERROR_INSERTING_DATABASE = "Something Wrong. ERROR INSERTING IN DATABASE";
Message.ERROR_GETTING_VALUES_FROM_DATABASE = "Something Wrong. ERROR GETTING FROM DATABASE";
Message.VALUE_WAS_NOT_FOUND = "Something Wrong. The values was ->>NOT<<- FOUND BY ID";
Message.ERROR_AT_DELETE_FROM_DATABASE = "Something Wrong. The value was NOT deleted";
Message.ERROR_AT_UPDATE_FROM_DATABASE = "Something Wrong. The value was NOT updated";