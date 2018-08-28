import { Meteor } from 'meteor/meteor';


var request = require('request'); // "Request" library

var client_id = 'd5f5e4ab7b124fbba4fb37d6b3df37bf'; // Your client id
var client_secret = 'edd9260ba12f4ee0b2295d96b46ab7b4'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var tk;
request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    tk = body.access_token;
    console.log(token);
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});


Meteor.methods({
	'searchArtists'(searchText){
		console.log(tk);
		const result = HTTP.call('GET', 'https://api.spotify.com/v1/search?query='+searchText +'&offset=0&limit=20&type=artist&market=US',{
			 headers: {
        		'Authorization': 'Bearer ' + tk
      		},
      	json: true
	});
		

	console.log(result);
	return result.data.artists.items;


		
	},
	'getArtist'(id){
		const result = HTTP.call('GET', 'https://api.spotify.com/v1/artists/'+id,{
			 headers: {
        		'Authorization': 'Bearer ' + tk
      		},
      	json: true
	});
		return result.data;
	},
	'getAlbums'(artistid){
		const result = HTTP.call('GET', 'https://api.spotify.com/v1/artists/'+artistid+'/albums',{
			 headers: {
        		'Authorization': 'Bearer ' + tk
      		},
      	json: true
	});
		return result.data.items;
	}




});