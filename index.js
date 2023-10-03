import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

let toDoList = [];
let workDoList = [];

function addtodoList(data){
    toDoList.push(data);
}

function addworktodoList(data){
    workDoList.push(data);
}

var dateString = "";
let weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let months = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];

    const date = new Date();
    let weekday = weekDays[date.getDay()];
    let day = date.getDate();
    let mon = months[date.getMonth()];
    let yr = date.getFullYear();

   
    dateString = ` ${day} / ${mon} / ${yr}`;


app.get("/", (req, res) => {
    
    res.render("index.ejs",{
        list : toDoList,
        date : dateString,
        day :  weekday,
    });
});

app.post("/add", (req, res) => {
    let data =req.body['todo'];
    if(data === ''){
        res.redirect("/")
    }else{
        addtodoList(data);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    
    res.render("work.ejs",{
        list : workDoList,
        date : dateString,
        day :  weekday,
    });
});

app.post("/workadd", (req, res) => {
    let data =req.body['todo'];
    if(data === ''){
        res.redirect("/work")
    }else{
        addworktodoList(data);
        res.redirect("/work");
    }
});


app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});