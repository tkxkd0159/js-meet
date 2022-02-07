import express from "express";

const MODE = "dev"
const PORT = 3000;
const app = express();
app.set("view engine", "pug");
if (MODE === "dev") {
    app.set("views", __dirname + "/views");
} else {
    app.set("views", __dirname + "../" + "/dist/views");
}
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.listen(PORT, () => {console.log(`Listening on http://localhost:${PORT}`)});