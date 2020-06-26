import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = "/";
}

Router.map(function () {
  this.route("daily-ratings", { path: '/' }, function () {
    this.route("new");
  });
});
