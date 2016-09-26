import Ember from 'ember';

export default Ember.Controller.extend({
	isHome: function(){
		return this.get('currentRouteName') =='home';
	}.property('currentRouteName')
<<<<<<< HEAD
});
=======
});
>>>>>>> cc3f1b9c569c4d4c44504ca7b8b07d7646967f0a
