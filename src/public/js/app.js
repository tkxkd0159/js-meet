const ws = new WebSocket(`ws://${window.location.host}`)

ws.addEventListener("open", () => {
    console.log("Connected to the server ✅")
});

ws.addEventListener("message", (msg) => {
    console.log(`From Server : ${msg.data}`, msg)
});

ws.addEventListener("close", () => {
    console.log("Disconnected from the server ❌")
})


setTimeout(() => {
    ws.send("Hello from the browser after 10 secs")
}, 1500);