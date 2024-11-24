Game.on("playerJoin", (player) => {
    player.socket.keepalive.kickIdlePlayer = () => { }
})