"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _NewsController = _interopRequireDefault(require("./controllers/NewsController"));

var _ProjectsController = _interopRequireDefault(require("./controllers/ProjectsController"));

var _PersonalityController = _interopRequireDefault(require("./controllers/PersonalityController"));

var _BannerController = _interopRequireDefault(require("./controllers/BannerController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = _express.default.Router();

const newsController = new _NewsController.default();
const projectsController = new _ProjectsController.default();
const bannerController = new _BannerController.default();
const personalityController = new _PersonalityController.default(); //News

routes.post('/news', newsController.create);
routes.get('/news', newsController.get);
routes.delete('/news/:id', newsController.delete);
routes.put('/news/:id', newsController.update); //Projects

routes.post('/projects', projectsController.create);
routes.get('/projects', projectsController.get);
routes.delete('/projects/:id', projectsController.delete);
routes.put('/projects/:id', projectsController.update); //Personality

routes.post('/personality', personalityController.create);
routes.get('/personality', personalityController.get);
routes.delete('/personality/:id', personalityController.delete);
routes.put('/personality/:id', personalityController.update); //Banner

routes.post('/banner', bannerController.create);
routes.get('/banner', bannerController.get);
routes.delete('/banner/:id', bannerController.delete);
routes.put('/banner/:id', bannerController.update);
var _default = routes;
exports.default = _default;