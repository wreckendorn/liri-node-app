
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput = process.argv;
if (userInput === "my-tweets") {
    //This will show your last 20 tweets and when they were created at in your terminal/bash window.//
}
if (userInput === "spotify-this-song") {
    // This will show the following information about the song in your terminal/bash window
     
//      * Artist(s)
     
//      * The song's name
     
//      * A preview link of the song from Spotify
     
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.//
}
if (userInput === "movie-this") {
//     This will output the following information to your terminal/bash window:

//     ```
//       * Title of the movie.
//       * Year the movie came out.
//       * IMDB Rating of the movie.
//       * Rotten Tomatoes Rating of the movie.
//       * Country where the movie was produced.
//       * Language of the movie.
//       * Plot of the movie.
//       * Actors in the movie.
//     ```

//   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    
//     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
    
//     * It's on Netflix!
  
//   * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
}
if (userInput === "do-what-it-says") {
    // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
    //  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
    //  * Feel free to change the text in that document to test out the feature for other commands.
}

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.