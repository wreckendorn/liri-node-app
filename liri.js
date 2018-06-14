// requires
require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");

// keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// other variables
var userInput = process.argv[2];
var textFile = "log.txt";
var entry;

// run my Tweet function if user enters "my-tweets"
if (userInput === "my-tweets") {
    myTweets();
}

// run spotifySong function if user enters "spotify-this-song"
if (userInput === "spotify-this-song") {
    var song = process.argv[3];

    if (song) {
        var songArr = process.argv;

        for (var i = 4; i < songArr.length; i++) {
            song += "+" + songArr[i]; 
        }
    }
    else {
        song = "artist:Ace+of+Base&song:The+Sign"
    }
    spotifySong(song);
}

// run movieThis function if user enters "movie-this"
if (userInput === "movie-this") {
    var movieName = process.argv[3];
    if (movieName) {
        var movieArr = process.argv;
        for (var i = 4; i < movieArr.length; i++) {
            movieName += "+" + movieArr[i]; 
        }
    }
    else {
        movieName = "Mr+Nobody";
    }
    movieThis(movieName);
}

// run which ever function is listed in the random.txt file if user enters "do-what-it-says"
if (userInput === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }

       var output = data.split(",");
       if (output[0] = "spotify-this-song") {
           var song = output[1];
           spotifySong(song);
       }
       else if (output[0] = "my-tweets") {
           myTweets();
       }
       else if (output[0] = "movie-this") {
           var movieName = output[1];
           movieThis(movieName);
       }
       
    })
}

//displays 20 most recent tweets and calls append function to add it to log.txt
function myTweets() {
    entry = "my-tweets: "
    append(entry);
    var params = {screen_name: 'hecky64804231', count: 20};
    client.get('statuses/user_timeline', params, function(error, body, response) {
      if (!error) {
          for(i = 0; i < body.length; i++) {
        console.log(body[i].created_at);
        entry = body[i].created_at;
        append(entry);
        console.log(body[i].text);
        entry = body[i].text;
        append(entry);
        console.log("\n================\n");
          }
      }
      else {
          console.log(error);
          entry = error;
          append(entry);
      }
    });
}
  
//displays song information and calls append function to add it to log.txt
function spotifySong(song) {
    entry = "spotify-this-song: ";
    append(entry);
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            entry = error;
            append(entry);
            return;
        }
        var searchObject = data.tracks.items[0];
        console.log("\n================\n");
        console.log("Artist name: " + searchObject.artists[0].name);
        entry = "Artist name: " + searchObject.artists[0].name;
        append(entry);
        console.log("\n================\n");
        console.log("Song name: " + searchObject.name);
        entry = "Song name: " + searchObject.name;
        append(entry);
        console.log("\n================\n");
        console.log("Check out a preview here: " + searchObject.preview_url);
        entry = "Check out a preview here: " + searchObject.preview_url;
        append(entry);
        console.log("\n================\n");
        console.log("from this album: " + searchObject.album.name)
        entry = "from this album: " + searchObject.album.name;
        append(entry);
        console.log("\n================\n");
    });
}

//displays movie info and calls append function to add it to log.txt
function movieThis(movieName) {
    entry = "movie-this: ";
    append(entry);
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

     
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            entry = "Title: " + JSON.parse(body).Title;
            append(entry);
            console.log("\n================\n");
            console.log("Release Year: " + JSON.parse(body).Year);
            entry = "Release Year: " + JSON.parse(body).Year;
            append(entry);
            console.log("\n================\n");
            console.log("IMDB Rating of " + JSON.parse(body).imdbRating);
            entry = "IMDB Rating of " + JSON.parse(body).imdbRating;
            append(entry);
            console.log("\n================\n");
            if (JSON.parse(body).Ratings[1].value){
                console.log("Rotten Tomatoes rating of " + JSON.parse(body).Ratings[1].value);
                entry = "Rotten Tomatoes rating of " + JSON.parse(body).Ratings[1].value;
                append(entry);
            }
            else {
                console.log("Rotten Tomatoes rating: not rated");
                entry = "Rotten Tomatoes rating: not rated";
                append(entry);
            }
            console.log("\n================\n");
            console.log("This was made in " + JSON.parse(body).Country);
            entry = "This was made in " + JSON.parse(body).Country;
            append(entry);
            console.log("\n================\n");
            console.log("Available in " + JSON.parse(body).Language);
            entry = "Available in " + JSON.parse(body).Language;
            append(entry);
            console.log("\n================\n");
            console.log("Plot: " + JSON.parse(body).Plot);
            entry = "Plot: " + JSON.parse(body).Plot;
            append(entry);
            console.log("\n================\n");
            console.log("Starring: " + JSON.parse(body).Actors);
            entry = "Starring: " + JSON.parse(body).Actors;
            append(entry);
            console.log("\n================\n");
        }
    })
}

// function for adding stuff to the log.txt
function append(entry) {
    fs.appendFile(textFile, entry, function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }
 
    });
}
