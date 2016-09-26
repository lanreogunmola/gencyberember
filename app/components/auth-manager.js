import Ember from 'ember';

export default Ember.Component.extend({
	isLoggedIn: false,
	username: '',
	password: '',
	errorMsg: '',
	remember: false,
	userid: -1,
	actions: {
		login: function(){
			//do stuff to authenticate here
			var username = this.get('username');
			var password = this.get('password');
			var remember = this.get('remember');
			var data = {
				'username': username,
				'password': password};
			var controllerObj = this;
			Ember.$.post('../api/session/', data, function(response){
				if(response.isauthenticated){
					//success
					console.log('Login POST Request to ../api/session/ was successful.');
					controllerObj.set('username', response.username);
					controllerObj.set('userid', response.userid);
					controllerObj.set('isLoggedIn', true);

					if(remember){
						//save username and pass to local storage
						localStorage.setItem('remember', true);
						localStorage.setItem('username', controllerObj.get('username'));
						localStorage.setItem('password', controllerObj.get('password'));
					}
					else{
						localStorage.removeItem('remember');
						localStorage.removeItem('username');
						localStorage.removeItem('password');
					}
					controllerObj.set('password', '');
				} else{
					//errors
					console.log('Login POST Request to ../api/session/ was unsuccessful.');
					controllerObj.set('errorMsg', response.message);
				}
			});
<<<<<<< HEAD

=======
			
>>>>>>> cc3f1b9c569c4d4c44504ca7b8b07d7646967f0a
		},
		logout: function(){
			var controllerObj = this;
			Ember.$.ajax({url: '../api/session/', type: 'DELETE'}).then(
				function(response){
					console.log('Logout DELETE Request to ../api/session/ was successful:' + response);
					controllerObj.set('isLoggedIn', false);
					controllerObj.set('errorMsg', '');
					controllerObj.set('username', '');
					controllerObj.set('userid', -1);

					if(localStorage.remember) {
						controllerObj.set('remember', localStorage.remember);
						controllerObj.set('username', localStorage.username);
						controllerObj.set('password', localStorage.password);
					}
				}
			);

		},
	},
	init: function(){
		this._super();
		var controllerObj = this;
		Ember.$.get('../api/session/', function(response){
			if(response.isauthenticated){
				//success
				console.log('The user: \''+response.username+'\' is currently logged in.');
				controllerObj.set('username', response.username);
				controllerObj.set('userid', response.userid);
				controllerObj.set('isLoggedIn', true);
			} else{
				//errors
				console.log('The user is not currently logged in.');
			}
		});
		if(localStorage.remember) {
			this.set('remember', localStorage.remember);
			this.set('username', localStorage.username);
			this.set('password', localStorage.password);
		}
	}
});
