import '/lib/router.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './templates/layout.html';
import './templates/search.html';
import './templates/artists.html';
import './templates/artist.html';
import './templates/includes/navbar.html';
import './templates/albums.html';

// Artist Helpers
Template.artists.helpers({
	artists(){
		return Session.get('artists');
	}
});
 





// Search Events
Template.search.events({
	'keyup #searchArtists':function(){
		let searchText = event.target.value;

		if(searchText == ''){
			Session.set('artists', null);
		}



		console.log(searchText);
		Meteor.call('searchArtists', searchText, (err, artists) => {
			if(err){
				console.log(err);
			}else{
				console.log(artists);
				Session.set('artists', artists);
			}
		});
	}
});