const mongoose=require('mongoose'); // acquiring library

mongoose.connect('mongodb://localhost/todo_list_db'); //connecting mongoose db

const db=mongoose.connection; // this connection gives access to db

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('successfully connected to the db');
});