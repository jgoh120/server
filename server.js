var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var cors = require("cors");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movieStack');
var db =  mongoose.connection;

var movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    rating: Number,
    posterUrl: String
});
var Movie = mongoose.model('movies', movieSchema)   // this is the connection

// let movies=[
//     {id:1, title: 'A',year: 2020},
//     {id:2, title: 'xyz',year: 1998}
// ]
/*
let movies = [
    {
        title: 'Avengers: End Game',
        genre: 'Action',
        rating: 4.8,
        posterUrl: 'https://is3-ssl.mzstatic.com/image/thumb/Video113/v4/6e/47/f6/6e47f680-ac54-21ff-a37a-3aab1a9970b0/DIS_AV_ENDGAME_FINAL_ENGLISH_US_WW_WW_ARTWORK_EN_2000x3000_1OWPBJ00000GQ6.lsr/268x0w.jpg'
    },
    ...
];
*/

//let nextId = 5;

app.use(cors());

// middleware 1 - body-parser (string to json)
app.use(bodyParser.json());

// middleware 2 - logger
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

//  middleware 3 - to check for match
app.get("/movies", (req, res) => {
    //res.json(movies);   // json to string
    Movie.find((err,movies)=>{ 
        res.json(movies);
    });
});

app.get("/movies/:id", (req, res) => {
    //res.json(movies);   // json to string
    Movie.findById(req.params.id,(err,movieObj)=>{
        res.json(movieObj);
    })
});

app.delete("/movies/:id", (req, res) => {
    // removes movie with given id
    //movies = movies.filter(m => m.id !== parseInt(req.params.id));
    // TODO
    Movie.deleteOne({_id: req.params.id},(err)=>{
        res.send({"status": "ok delete done"});
    });
});

app.put("/movies/:id", (req, res) => {
    // const movie = movies.find(m => m.id === parseInt(req.params.id));
    // movie.title = req.body.title || movie.title
    // movie.year = req.body.year || movie.year
    //TODO
    Movie.updateOne({_id: req.params.id},req.body,(err)=>{
        res.send({"status": "ok edit done"})
    });
});

// bodyparser should be here for when server receives new data 
// to push json data
app.post("/movies", (req, res) => {
    const movie = req.body;
    // movie.id = nextId;
    // movies.push(req.body);
    //TODO
    Movie.create(req.body,(err)=>{
        res.send('ok')
    });
});

app.post("/users/authenticate", (req, res) => {
    const movie = req.body;

    if (movie.username == "test" && movie.password == "test"){
        
        res.send(
            {
                id : 1,
                username : movie.username,
                password : movie.password,
                firstname : "Justin",
                lastname : "Wu",
                organisation : "ABC",
                email : "just_wu@abc.com",
                contact : 99023411            
            }
        );
    } else {
        res.send({})
    }
});

app.listen(3000);
console.log("Ok Express app running on port 3000");