require("dotenv").config();

var request = require("request");

let keys = require("./keys");
var Twitter = require('twitter');
let Spotify = require('node-spotify-api');

// does the Twitter thing
function getTweets() {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: 'is_this_even',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
        }
        for (let index = 0; index < tweets.length; index++) {
            const element = tweets[index];
            console.log(element.text);
            console.log("");
            console.log(element.created_at);
        }
    });
};
if (process.argv[2] == "my-tweets") {
    getTweets();
}
// does the movie thing
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

function getMovie() {
    // let movInput = process.argv[3]
    let movInput = "";
    let nodeArgs = process.argv;
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movInput = movInput + "+" + nodeArgs[i];
        } else {
            movInput += nodeArgs[i];
        }
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movInput + "&y=&plot=short&apikey=trilogy";
    
    console.log(queryURL);
    
    request(queryURL,function (error, response, body) {
        if (!error && response.statusCode === 200) {}
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        console.log("");
        console.log("Actors in this movie : " + JSON.parse(body).Actors);
        console.log("");
        console.log("The name of the movie is: " + JSON.parse(body).Title);
        console.log("");
        console.log("The release date was : " + JSON.parse(body).Released);
        console.log("");
        console.log("Rotten Tomatos rating: "+ JSON.parse(body).Ratings[1].Value);
        console.log("");
        console.log("The countries it was made in : " + JSON.parse(body).Country);
        console.log("");
        console.log("The languages of the movie is: " + JSON.parse(body).Language);
        console.log("");
        console.log("The plot of the movie is : " + JSON.parse(body).Plot);
        // console.log(body);
        
        console.log(movInput);
        if (movInput === "") {
            movInput === "Rambo";
        }
    })
};
if (process.argv[2] == "movie-this") {
    getMovie();
}
// does the spotify thing
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
function getSpotify() {
    let tunes = new Spotify(keys.spotify);
    // lets the input be more than one word
    let tuneInput = "";
    let nodeArgs = process.argv;
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            tuneInput = tuneInput + "+" + nodeArgs[i];
        } else {
            tuneInput += nodeArgs[i];
        } 
    }
    // pulls from the API
    tunes.search({
        type: 'track',
        query: tuneInput,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Here's a link  " +data.tracks.items[0].artists[0].external_urls.spotify);
        console.log("")
        console.log("This is the name of the Artist(s)  " + data.tracks.items[0].artists[0].name);
        console.log("")
        console.log("This is the name of the song  " + data.tracks.items[0].name);
        console.log("")
        console.log("This is the Album that the song is on  " + data.tracks.items[0].album.name);
    });
   
}
if (process.argv[2] == "spotify-this-song") {
    getSpotify()
    // console.log(data);
}