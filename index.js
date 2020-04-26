//acquiring express
const express= require('express');
const app=express();

//acquiring parser
const bodyParser= require("body-parser");

//defining port to run
const port = 8000;

// acquiring database
const db=require('./config/mongoose'); 
const Todo=require('./models/todo');

//acquiring view engine EJS
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

//acquiring css files
app.use(express.static('assets'));

//dummy list
var todoList=[
    {
        description: "Go to PTM",
        category: "personal",
        date:1/10/19

    },
    {
        description:"give science assignment",
        category: "school",
        date: 2/10/19
    }
]

//controller for new todo list
app.post('/newtodo',function(req,res){
    console.log("Todo Created");
    Todo.create({
        description : req.body.description,
        category:req.body.category,
        date:req.body.date
    },function(err,newTodo){
        if(err){console.log("error in creation");
            return; }
            console.log('*****',newTodo);
            return res.redirect('back');
    });

});

//controller for deleting todo list
app.get('/delete-todo/',function(req,res){
    let id=req.query.id;
    Todo.findByIdAndDelete(id,function(err){
    if(err)
    console.log('error in deleting');
    return;
    });
    return res.redirect('back');
});

//controller for handling requests with'/'
app.get('/',function(req,res){
    res.render("home.ejs");
});

//controller for handling requests with '/todo.ejs'
app.get('/todo.ejs',function(req,res){

    Todo.find({}, function(err,todo){
        if(err){
            console.log('error in fetching todos');
            return;
        }
        res.render("todo.ejs",{
            todoList:todo
    });

    
    });
});

//whether the app is listening at the mentioned port or not
app.listen(port,function(err){
    if(err)
    console.log("not running");

    console.log(`Running on port: ${port}`)
});