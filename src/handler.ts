import WebSocket from "ws";

function handleConn(cliSock: WebSocket){
    console.log("Connected to the client ✅")

    cliSock.on("close", () => {
        console.log("Disconnected from the client ❌")
    });

    cliSock.on("message", (msg: Buffer) => {
        console.log(msg.toString())
    })

    cliSock.send("Hello!!!")
}


export {
    handleConn
}