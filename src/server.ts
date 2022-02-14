import http from "http";
import WebSocket from "ws";
import express from "express";

import { handleConn } from "./handler";

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

const handleListen = () => {console.log(`Listening on http://localhost:${PORT}`)}
const server = http.createServer(app);
server.listen(PORT, handleListen)

const wss = new WebSocket.Server({ server });
wss.on("connection", handleConn);