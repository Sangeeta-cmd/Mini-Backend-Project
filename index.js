const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4} = require("uuid");
const methodOverride = require("method-override")

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));                // override with POST having ?_method=PATCH

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let posts =[
    {
        id : uuidv4(),
        username: "apnacollege",
        content: "Best you tube channel for coding."
    },
    {
        id : uuidv4(),
        username: "sangeetapujari",
        content:"Today I am learning restful APIs"
    },
    {
        id:uuidv4(),
        username: "rahul",
        content:"I got my first internship!!"
    }
]

// Get-request, /posts path will retrive all posts in main / index file
app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
})

// Write new POST, we need to create 2paths, get and post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    if(username !== ''){
        posts.push({id, username, content})
    }
    res.redirect("/posts"); // By default this is get method 
})


// showing individual posts on id basis
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=> id === post.id); // if id matches then it will return that index value(here is individual post), otherwise 'undefined'
    res.render("show.ejs", {post});
})


// Udating the existing posts
app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("update.ejs" , {post})
})

app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((post)=> id === post.id);
    post.content = req.body.content;
    res.redirect("/posts");
})


// Deleting the post
app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((post)=> id !== post.id);
    res.redirect("/posts");
})


app.listen(port,()=>{
    console.log("server listening on port ", port);
})