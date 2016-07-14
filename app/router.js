import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('profile', {path: "profile/:userid"});
  this.route('home');
});

export default Router;
