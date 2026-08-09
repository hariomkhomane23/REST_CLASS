const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: "1",
        username: "apnaclg",
        content: "I love coding"
    },
    {
        id: "2",
        username: "Hariom",
        content: "Paus lay yetoy"
    },
    {
        id: "3",
        username: "Ishu",
        content: "Zopun ghe mg"
    }
];


// -------------------
// SHOW ALL POSTS
// -------------------

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});


// -------------------
// SHOW NEW POST FORM
// -------------------

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});


// -------------------
// CREATE NEW POST
// -------------------

app.post("/posts", (req, res) => {

    let { username, content } = req.body;

    let id = Date.now().toString();

    posts.push({
        id,
        username,
        content
    });

    // Redirect to main page
    res.redirect("/posts");
});


// -------------------
// SHOW EDIT FORM
// -------------------

app.get("/posts/:id/edit", (req, res) => {

    let { id } = req.params;

    let post = posts.find((p) => p.id === id);

    res.render("edit.ejs", { post });
});


// -------------------
// UPDATE POST
// -------------------

app.post("/posts/:id/edit", (req, res) => {

    let { id } = req.params;

    let post = posts.find((p) => p.id === id);

    let { username, content } = req.body;

    post.username = username;
    post.content = content;

    // Redirect to main page after editing
    res.redirect("/posts");
});


// -------------------
// DELETE POST
// -------------------

app.post("/posts/:id/delete", (req, res) => {

    let { id } = req.params;

    posts = posts.filter((p) => p.id !== id);

    // Redirect to main page after deleting
    res.redirect("/posts");
});


// -------------------
// START SERVER
// -------------------

app.listen(port, () => {
    console.log("listening to port : 8080");
});