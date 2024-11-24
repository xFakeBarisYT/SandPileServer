const {Rigimation} = require('./AnimLibrary');
const anim = new Rigimation("bicycleMapping.json",1,3);
anim.play() 

Game.on('initialSpawn', (player) => {
    const seat = world.bricks.find(brick => brick.name === "Part(102)");
    const handle = world.bricks.find(brick => brick.name === "Part(87)");
    let seated = false;
    let newrotation = 0;
    let starterJumpPower = player.jumpPower;
    let speed = player.speed;
    var bot = null;
    var promptunseat = false;
    seat.touching(async (player)=>{
        if (seated != true && promptunseat == false){
            seated = true

            var mirrorbot = new Bot("a")
            Game.newBot(mirrorbot)

            let outfit = new Outfit()
            outfit.copy(player)
            mirrorbot.setOutfit(outfit)
            bot = mirrorbot;
            player.setCameraType("orbit");
            player.setCameraObject(seat);
            while (seated == true && promptunseat == false) {
                newrotation = (anim.currentFrame/360)*10
                await wait(0.1/3);
                player.setScale(new Vector3(0.01,0.01,0.01));
                player.setSpeed(0);
                player.setJumpPower(0);
                player.setCameraPosition(mirrorbot.position+ new Vector3(5,-5,5))
                mirrorbot.setPosition(seat.position);
                mirrorbot.setRotation(new Vector3(newrotation,newrotation,newrotation))
            }
            player.setCameraObject(player)
            player.setScale(new Vector3(1,1,1));
            player.setSpeed(starterJumpPower);
            player.setPosition(seat.position);
            player.setJumpPower(speed);
            mirrorbot.destroy()
            await wait(0.5);
            promptunseat = false;
            seated = false;
        }
    });

    player.keypress(async(key) => {
        if (key === "space") {
            promptunseat = true;
        }
    });
    Game.on("playerLeave", (pal) => {
        if (pal == player){
            bot.destroy();
        }
     })
});

  

async function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}