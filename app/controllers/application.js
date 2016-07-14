import Ember from 'ember';

export default Ember.Controller.extend({
	isHome: function(){
		return this.get('currentRouteName') =='home';
	}.property('currentRouteName')
});
