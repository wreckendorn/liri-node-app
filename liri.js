
require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");

var spotify = require("spotify");
var client2 = new Spotify(keys.spotify);

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var userInput = process.argv[2];
var song = process.argv[3];

if (userInput === "my-tweets") {
    console.log("ok");
    var params = {screen_name: 'hecky64804231', count: 20};
    client.get('statuses/user_timeline', params, function(error, body, response) {
      if (!error) {
          for(i = 0; i < body.length; i++) {
        console.log(body[i].created_at);
        console.log(body[i].text);
        console.log("\n================\n");
          }
      }
      else {
          console.log(error);
      }
    });
}
    //This will show your last 20 tweets and when they were created at in your terminal/bash window.//
    
    

if (userInput === "spotify-this-song") {

    client2.search({ type: 'track', query: song}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
     
       console.log(data);
    });
};
//     // This will show the following information about the song in your terminal/bash window
     
// //      * Artist(s)
     
// //      * The song's name
     
// //      * A preview link of the song from Spotify
     
// //      * The album that the song is from

// //    * If no song is provided then your program will default to "The Sign" by Ace of Base.//
// }

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
   

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("\n================\n");
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("\n================\n");
        console.log("IMDB Rating of " + JSON.parse(body).imdbRating);
        console.log("\n================\n");
        console.log("Rotten Tomatoes rating of " + JSON.parse(body).Ratings[1].Value);
        console.log("\n================\n");
        console.log("This was made in " + JSON.parse(body).Country);
        console.log("\n================\n");
        console.log("Available in " + JSON.parse(body).Language);
        console.log("\n================\n");
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("\n================\n");
        console.log("Starring: " + JSON.parse(body).Actors);
        console.log("\n================\n");
    }
})
}
// if (userInput === "do-what-it-says") {
//     // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
//     //  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
//     //  * Feel free to change the text in that document to test out the feature for other commands.
// }

// // ### BONUS

// // * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// // * Make sure you append each command you run to the `log.txt` file. 

// // * Do not overwrite your file each time you run a command.