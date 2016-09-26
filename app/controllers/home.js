import Ember from 'ember';

var PhotoCollection = Ember.ArrayProxy.extend(Ember.SortableMixin, {
	sortProperties: ['dates.taken'],
	sortAscending: false,
	content: [],
});

export default Ember.Controller.extend({
	applicationController: Ember.inject.controller('application'),
	photos: PhotoCollection.create(),
	searchField: '',
	tagSearchField: '',
	filteredPhotosLoaded: function(){
		return this.get('filteredPhotos').length >0;
	}.property('filteredPhotos.length'),
	tagList: ['hi','cheese'],
	filteredPhotos: function () {
		var filter = this.get('searchField');
		var rx = new RegExp(filter, 'gi');
		var photos = this.get('photos');

		return photos.filter(function(photo){
			return photo.get('title').match(rx) || photo.get('owner.username').match(rx);
		});
	}.property('photos.@each','searchField'),
	actions: {
		like: function (photo) {
			var title = photo.get('title');
			if(title.length >= 97){
				title = title.substring(0,96) + "...";
			}
			var photodata = {
				'user': this.get('applicationController').get('userid'),
				'title': title,
				'objid': photo.get('id'),
				'farm': photo.get('farm'),
				'secret': photo.get('secret'),
				'server': photo.get('server'),
			};
			Ember.$.post('../api/likes/', photodata, function(response){
				photo.set('liked', true);
				console.log('Request to add like for photo: '+photo.get('title')+' returned the following response');
				console.log(response);
			});
		},
		search: function () {
			this.set('loading', true);
			this.get('photos').content.clear();
			this.store.unloadAll('photo');
			this.send('getPhotos',this.get('tagSearchField'));
		},
		getPhotos: function(tag){
<<<<<<< HEAD
			var apiKey = 'f73a4f9b7486132776d620f10d4ccf93';
=======
			var apiKey = '01dbbdd8cb57d5d34b5f804aad4e392b';
>>>>>>> cc3f1b9c569c4d4c44504ca7b8b07d7646967f0a
			var host = 'https://api.flickr.com/services/rest/';
			var method = "flickr.photos.search";
			var requestURL = host + "?method="+method + "&api_key="+apiKey+"&tags="+tag+"&per_page=50&format=json&nojsoncallback=1";
			var photos = this.get('photos');
			var t = this;
			Ember.$.getJSON(requestURL, function(data){
				if (! data.photos ) {
					console.log("Could not load photos. Check your API key");
					return;
				}
				//callback for successfully completed requests
				//make secondary requests to get all of the photo information
				data.photos.photo.map(function(photoitem) {//iterate over each photo
					var infoRequestURL = host + "?method="+"flickr.photos.getInfo" + "&api_key="+apiKey+ "&photo_id="+photoitem.id+"&format=json&nojsoncallback=1";
					Ember.$.getJSON(infoRequestURL, function(item){
						var photo = item.photo;
						var tags = photo.tags.tag.map(function(tagitem){
							return tagitem._content;
						});
						var newPhotoItem = t.store.createRecord('photo',{
							title: photo.title._content,
							dates: photo.dates,
							owner: photo.owner,
							description: photo.description._content,
							link: photo.urls.url[0]._content,
							views: photo.views,
							tags: tags,
							//flickr url data
							id: photo.id,
							farm: photo.farm,
							secret: photo.secret,
							server: photo.server,
						});
						photos.pushObject(newPhotoItem);
					});
				});
			});
		},
		clicktag: function(tag){
			this.set('tagSearchField', tag);
			this.set('loading', true);
			this.get('photos').content.clear();
			this.store.unloadAll('photo');
			this.send('getPhotos',tag);
		}
	},
	init: function(){
		this._super.apply(this, arguments);
<<<<<<< HEAD
		var apiKey = 'f73a4f9b7486132776d620f10d4ccf93';
=======
		var apiKey = '4435e3a217bc7afc94dfcba607b70eb1';
>>>>>>> cc3f1b9c569c4d4c44504ca7b8b07d7646967f0a
		var host = 'https://api.flickr.com/services/rest/';
		var method = "flickr.tags.getHotList";
		var requestURL = host + "?method="+method + "&api_key="+apiKey+"&count=75&format=json&nojsoncallback=1";
		var t = this;
		Ember.$.getJSON(requestURL, function(data){
			//callback for successfully completed requests
			console.log(data);
			data.hottags.tag.map(function(tag) {
				t.get('tagList').pushObject(tag._content);
			});
		});
	}
});
