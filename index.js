const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const path = require("path");

// Middleware
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Posts data
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


// ===============================
// HOME PAGE
// ===============================

app.get("/", (req, res) => {
    res.redirect("/posts");
});


// ===============================
// SHOW ALL POSTS
// ===============================

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});


// ===============================
// SHOW NEW POST FORM
// ===============================

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});


// ===============================
// CREATE NEW POST
// ===============================

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


// ===============================
// SHOW EDIT FORM
// ===============================

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit.ejs", { post });
});


// ===============================
// UPDATE POST
// ===============================

app.post("/posts/:id/edit", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    let { username, content } = req.body;

    post.username = username;
    post.content = content;

    // Redirect to main page
    res.redirect("/posts");
});


// ===============================
// DELETE POST
// ===============================

app.post("/posts/:id/delete", (req, res) => {
    let { id } = req.params;

    posts = posts.filter((p) => p.id !== id);

    // Redirect to main page
    res.redirect("/posts");
});


// ===============================
// START SERVER
// ===============================

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});