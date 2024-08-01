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

app.post("/", (req, res) => {
    posts.push(req.body);
    res.redirect("/");
});
app.get("/:postid", (req, res) => {
    res.render("post.ejs", {post: posts[req.params.postid]});
})
app.patch("/editPost", (req, res) => {
    //console.log(req.body);  
});
app.delete("/deletePost", (req, res) => {
    //console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});