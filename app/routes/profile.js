import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model){
		var url = '../api/userprofiles/' + model.userid +'/';
		Ember.$.get(url, function(response){
			if(!response.detail){
				//success
				controller.set('likes', response.likes);
				console.log('Loading user profile');

			} else{
				//errors
				console.log('Error loading user profile.');
			}
			console.log(response);
		});
	}
});