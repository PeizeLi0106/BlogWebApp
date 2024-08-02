import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000; 
var posts = []; // an array of posts 
// an example post {title: "", content: ""}
app.use("/",express.static("./node_modules/bootstrap/dist/"));
app.use(express.static("public")); // deals with static files
app.use(bodyParser.urlencoded({ extended: true })); // deals with readable body data

// view all their written posts
app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts}); // render the home page and send an array of posts to the backend
});
app.get("/search", (req, res) => {
    let searchingTitle = req.query.q;
    console.log(searchingTitle);
    let notFound = true;
    for (var i = 0; i < posts.length; i++) {
        if (posts[i].title == searchingTitle) {
            //console.log("found a matching title");
            notFound = false;
            res.render("post.ejs", {post: posts[i], postid: i});
        }
    }
    if (notFound){
        console.log("result not found");
        res.redirect("/");
    }
})
app.post("/", (req, res) => {
    posts.push(req.body);
    res.redirect("/");
});

app.post("/:postid", (req, res) => {
    let postid = req.params.postid;
    posts[postid] = req.body;
    res.redirect("/");
});

app.get("/:postid", (req, res) => {
    let postid = req.params.postid;
    res.render("post.ejs", {post: posts[postid], postid: postid});
})
app.post("/editPost/:postid", (req, res) => {
      let postid = req.params.postid;
      res.render("edit.ejs", {post: posts[postid], postid: postid});
});
app.post("/deletePost/:postid", (req, res) => {
    posts.splice(req.params.postid, 1); // deletes the post at postid from the posts array
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});