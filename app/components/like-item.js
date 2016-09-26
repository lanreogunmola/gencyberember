import Ember from 'ember';

export default Ember.Component.extend({
	url: Ember.computed('like.farm','like.server','like.id','like.secret', function(){
		return "https://farm"+this.get('like').farm+
		".staticflickr.com/"+this.get('like').server+
		"/"+this.get('like').objid+"_"+this.get('like').secret+"_b.jpg";
	}),
});