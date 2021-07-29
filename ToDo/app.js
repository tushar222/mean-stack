var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

//var index = require('./routes/index');
//var todos = require('./routes/todos');

var app = express();

const route = require('./routes/route');

mongoose.connect('mongodb://localhost:27017/todolist');

mongoose.connection.on('connected',function(){
    console.log("connected to mongodb");
});


mongoose.connection.on('error',function(err){
    if(err){
        console.log("error to connect to mongodb: "+ err);
    }
    
});

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.get('/', function(req, res){

    res.send('todo app');
});
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/v1/', todos);*/

app.listen(3000, function(){

    console.log("server started on port 3000");
})