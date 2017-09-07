var keys = require('./keys.js');
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require('fs');

 
console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");
var user = process.argv[2];
var userTwo = process.argv[3];
//process multiple words. Triggers if user types anything more than the above console logged options and first parameter.
	for(i=4; i<process.argv.length; i++){
	    userTwo += '+' + process.argv[i];
	}

function liriSwitch(){
	
	switch(user){

		case 'my-tweets':
		getTweets();
		break;

		case 'spotify-this-song':
		spotifySong();
		break;

		case 'movie-this':
		movieInfo();
		break;

		case 'do-what-it-says':
		followTheTextbook();
		break;
		
	}
};

function getTweets(){
	console.log("Tweets headed your way!");
	var client = new twitter({
		consumer_key: 'c9rzA3wnr02s7StWLEfktkIyO',
		consumer_secret: '	XLVQAb0i02K3Jfkgh6iGBGeTPHjPa5ZuAOktbl12tNSugCb1bh',
		access_token_key: '	905581277708996609-CwAXysP1uwqUwulU5rLZOi3bpMKnmpe',
		access_token_secret: 'xaph2In5vRBKCYFqh6mTBDltIDlVHAhGBDfN60VhhxTqm'
	});

	
	var noOfTweets = {
		
		count: 20
	};

	
	client.get('statuses/user_timeline', noOfTweets, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
				console.log("-------------------------");
				console.log(tweets);
				console.log(response);
	        }
		};
		
	});
};

function spotifySong(){
	
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id:"16707a80bdea48e5a88d4f878eaf0e92",
  secret:"38663f774c6c4f3cae6d19f1c081a251"
});
 

var searchTrack;
	if(userTwo === undefined){
		searchTrack = "The Sign";
		console.log("Searching for " + searchTrack);
	}else{
		searchTrack = userTwo;
		console.log("Searching for " + searchTrack);
	}
	//launch spotify search
	spotify.search({type:'track', query:searchTrack}, function(err,data){
	    if(err){
	        console.log('Error ' + err);
	        return;
	    }else{
	        
	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Preview: " + data.tracks.items[0].preview_url);
	        console.log("Album: " + data.tracks.items[0].album.name);
	       
	    }
	});
};
	
	

function movieInfo(){
	console.log("Netflix and Chill");

	//same as above, test if search term entered
	var searchMovie;
	if(userTwo === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = userTwo;
	};
    var url = "http://www.omdbapi.com/?t=" + searchMovie  + "&y=&plot=short&apikey=40e9cece";
	
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body).Title);
	        console.log("Release Year : " + JSON.parse(body).Year);
	        
	        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	        console.log("Country: " + JSON.parse(body).Country);
	        console.log("Language: " + JSON.parse(body).Language);
	        console.log("Plot: " + JSON.parse(body).Plot);
	        console.log("Actors: " + JSON.parse(body).Actors);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
	    }
    });
};

function followTheTextbook(){
	console.log("Looking at random.txt now");
	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}else{

     	
     	var dataArr = data.split(',');
        user = dataArr[0];
        userTwo = dataArr[1];
       
        for(i=2; i<dataArr.length; i++){
            userTwo = userTwo + "+" + dataArr[i];
        };
        
		liriSwitch();
		
    	};
    });

};

liriSwitch(); 

