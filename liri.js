
var twitterKeysObject = require('./keys.js');


var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');


var fs = require('fs');


var twitterKeys = twitterKeysObject.twitterKeys;


var command = process.argv[2];


var commandArgument = process.argv[3];


switch (command) {

	
	case 'my-tweets':
		myTweets();
		break;

	
	case 'spotify-this-song':
		mySpotify(commandArgument);
		break;

	
	case 'movie-this':
		movieThis(commandArgument);
		break;

	
	case 'do-what-it-says':
		doWhatItSays();
		break;

	
	default:
		console.log("Command not Valid. Please try again!");


}


function myTweets() {

	
	var client = new Twitter({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});

	
	client.get('statuses/user_timeline', {count: 20, trim_user: false, exclude_replies: true, include_rts: false}, function(error, tweets, response) {

		
		if (error) return console.log('Twitter error: ' + error);

		
		logCommand();

		
		for (var i=0; i<tweets.length; i++) {
			logThis(tweets[i].created_at);
			logThis(tweets[i].text);
		}

	
	});


}


function mySpotify(receivedSong) {

	
	var mySong = receivedSong ? receivedSong : 'The Sign Ace of Base';

	
	Spotify.search({ type: 'track', query: mySong }, function(err, data) {

		
		if (err) return console.log('Spotify Error: ' + err);

		
		if (data.tracks.items.length == 0) return (console.log('No such song found!'));

		
		logCommand();

		
		logThis('Artist Name: ' + data.tracks.items[0].artists[0].name);
		logThis('Song Name: ' + data.tracks.items[0].name);
		logThis('Preview Link: ' + data.tracks.items[0].preview_url);
		logThis('Album Title: ' + data.tracks.items[0].album.name);

	
	});


}


function movieThis(receivedMovie) {

	
	var myMovie = receivedMovie ? receivedMovie : 'Mr. Nobody';

	
	Request("http://www.omdbapi.com/?t=" + myMovie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {

		
		if (!error && response.statusCode === 200) {

			
			logCommand();

    		
    		logThis('Movie Title: ' + JSON.parse(body).Title);
    		logThis('Release Year: ' + JSON.parse(body).Year);
    		logThis('IMDB Rating: ' + JSON.parse(body).imdbRating);
    		logThis('Production Country: ' + JSON.parse(body).Country);
    		logThis('Language: ' + JSON.parse(body).Language);
    		logThis('Plot: ' + JSON.parse(body).Plot);
    		logThis('Actors/Actresses: ' + JSON.parse(body).Actors);
    		logThis('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
    		logThis('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
  		}

  	
	});


}


function doWhatItSays() {

	
	fs.readFile('random.txt', 'utf8', function(error, data) {

	
	if (error) return console.log('Filesystem Read Error: ' + error);

	


	
	var myFunction = dataObject[0];
	var myArgument = dataObect[1];

	
		case 'my-tweets':
			myFunction = 'myTweets';
			break;
		case 'spotify-this-song':
			myFunction = 'mySpotify';
			break;
		case 'movie-this':
			myFunction = 'movieThis';
			break;
		default:
			console.log('Unexpected error in doWhatItSays function');
	}

	
	eval(myFunction)(myArgument);

	
	});


}


function logThis(dataToLog) {

	
	console.log(dataToLog);

	
	fs.appendFile('log.txt', dataToLog + '\n', function(err) {
		
		
		if (err) return console.log('Error logging data to file: ' + err);
	
	
	});

his function
}


function logCommand() {

	
	if (commandArgument) {
		var tempString = "COMMAND: node liri.js " + command + " '" + commandArgument + "'";
	} else {
		var tempString = "COMMAND: node liri.js " + command;
	}

