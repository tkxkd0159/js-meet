import WebSocket from "ws";

// interface SendList {
//     [nickname: string]: WebSocket
// }

interface chatWebSocket extends WebSocket {
    nickname: string
}

const clients: chatWebSocket[] = [];

function parseMsg(msg: string) {
    return JSON.parse(msg);
}

function handleConn(cliSock: chatWebSocket){
    clients.push(cliSock);
    cliSock["nickname"] = "";
    console.log("Connected to the client ✅")

    cliSock.on("close", () => {
        console.log("Disconnected from the client ❌")
    });

    cliSock.on("message", (msg: Buffer) => {
        const msgObj = parseMsg(msg.toString());
        if (msgObj.type === "save_nickname") {
            cliSock["nickname"] = msgObj.payload
        }
        else if (msgObj.type === "new_msg") {
            const sender = cliSock.nickname;
            for (let ws of clients) {
                if (ws.nickname !== sender) {
                    ws.send(`${sender}: ${msgObj.payload}`)
                } else {
                    ws.send(`> ${sender}: ${msgObj.payload}`)
                }
            }
        }

    })
}


export {
    handleConn
}