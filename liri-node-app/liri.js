

require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");

var Spotify = require('node-spotify-api');
//log.txt file
var filename = './log.txt';


var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');

var userCommand = process.argv[2];
var secondCommand = process.argv[3];


for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}

//Spotify Keys
var spotify = new Spotify(keys.spotify);


var getArtistNames = function (artist) {
    return artist.name;
};

// Function for spotify-this-song
var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "What's my age again";
    }

    spotify.search(
        {
            type: "track",
            query: userCommand
        },
        function (err, data) {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("\n");
            }
        }
    );
};

//Switch 
function mySwitch(userCommand) {

    
    switch (userCommand) {


        case "spotify-this-song":
            getSpotify();
            break;

        case "movie-this":
            getMovie();
            break;
    }

   
    //OMDB
    function getMovie() {
    
        var movieName = secondCommand;
        //request to the OMDB API 
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "tt3896198&apikey=775e87e2";

        request(queryUrl, function (error, response, body) {

        
            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);

                console.log("Title: " + body.Title);
                console.log("Release Year: " + body.Year);
                console.log("IMdB Rating: " + body.imdbRating);
                console.log("Country: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);
                console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
                

            } else {
            
                console.log("Error")
            }
            if (movieName === "Mr. Nobody") {
                console.log("\n");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
            }
        });
    }



}   

mySwitch(userCommand);