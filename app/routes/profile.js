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
<<<<<<< HEAD
});
=======
});
>>>>>>> cc3f1b9c569c4d4c44504ca7b8b07d7646967f0a
