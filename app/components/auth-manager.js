import Ember from 'ember';

export default Ember.Component.extend({
	isLoggedIn: false,
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
						localStorage.setItem('username', this.get('username'));
						localStorage.setItem('password', this.get('password'));
					}
					else{
						localStorage.removeItem('remember');
						localStorage.removeItem('username');
						localStorage.removeItem('password');
					}
				} else{
					//errors
					console.log('Login POST Request to ../api/session/ was unsuccessful.');
					controllerObj.set('errorMsg', response.message);
				}
			});
			
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
				}
			);

		},
	},
	init: function(){
		this._super();
		if(localStorage.remember) {
			this.set('username', localStorage.username);
			this.set('password', localStorage.password);
		}
	}
});
