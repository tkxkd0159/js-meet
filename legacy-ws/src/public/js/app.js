const msgList = document.querySelector("ul#chat-history");
const msgForm = document.querySelector("form.form-main-chat");
const nickForm = document.querySelector("form.form-chat-nick");

const ws = new WebSocket(`ws://${window.location.host}`)

ws.addEventListener("open", () => {
    console.log("Connected to the server ✅")
});

ws.addEventListener("message", (msg) => {
    console.log(`From Server : ${msg.data}`, msg)
    const newChatRow = document.createElement("li");
    newChatRow.innerText = msg.data;
    msgList.append(newChatRow);
});

ws.addEventListener("close", () => {
    console.log("Disconnected from the server ❌")
})


// setTimeout(() => {
//     ws.send("Hello from the browser after 10 secs")
// }, 1500);

function makeMsg(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handleSubmit(e) {
    e.preventDefault(); // submit 시 새로고침 방지
    const input = msgForm.querySelector("input")
    ws.send(makeMsg("new_msg", input.value));
    input.value = "";
}

function handleNickSave(e) {
    e.preventDefault(); // submit 시 새로고침 방지
    const input = nickForm.querySelector("input")
    ws.send(makeMsg("save_nickname", input.value));
    input.value = "";
}
msgForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSave);