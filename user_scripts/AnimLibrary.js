async function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
}


class Rigimation {
    constructor(fileName, index = 1, playbackSpeed = 1) {
        this.fileName = fileName;
        this.index = index ;
        this.playSpeed = playbackSpeed;
        this.data = [];
        this.currentFrame = 0;
        this.loadFile();
    }

    loadFile() {
        try {
            const jsonData = require('./'+this.fileName);
            this.data = Array.isArray(jsonData) ? jsonData : jsonData;
        } catch (error) {
            console.error("Error loading JSON:", error);
        }
        if (this.data.length !== 0){
            this.looping = this.data.isLooping;
            this.interval = this.data.interval;
            this.frames = this.data.totalFrame;
            let successRate =0;
            this.data["bricks"].forEach(element => {
                let i = 0;
                for (let j = 0; j < world.bricks.length; j++) {
                    const brick = world.bricks[j];
                    if (brick.name === element["partId"]) {
                        i++;
                        if (i === this.index) {
                            element.brick = brick;
                            successRate++;
                            break; 
                        }
                    }
                }
            });
            var thispos = this.data.bricks[0].brick.position;
            this.position = new Vector3(thispos.X,thispos.Y,thispos.Z);
            this.rootPosition = new Vector3(thispos.X,thispos.Y,thispos.Z);
            
            if (this.data.bricks.length > successRate) {
                console.log(this.fileName+" animation didn't load properly on bricks");
            }
        }
    }


    setPosition(position){
        this.position = position;
        return this;
    }
    setRotation(rot){
        this.rotationY = rot;
        return this;
    }
    offsetPosition(position){
        this.position = new Vector3(this.position.y+position.x,this.position.y+position.y,this.position.z+position.z)
        return this;
    }
    async play(){
        if (this.looping){
            while (this.looping == true) {
                for (let keyframeIndex =0; keyframeIndex < this.frames;keyframeIndex++){
                    this.currentFrame = keyframeIndex;
                    this.data.bricks.forEach(RigidBody => {
                        var keyframe = RigidBody.keyframes[keyframeIndex];
                        if (keyframe != null && RigidBody.brick != null){
                            let keyXconvert = keyframe.Position.X-keyframe.Size.X/2;
                            let keyYconvert = keyframe.Position.Y-keyframe.Size.Y/2;
                            let keyZconvert = keyframe.Position.Z-keyframe.Size.Z/2;
                            let rootX = this.position.x-this.rootPosition.x;
                            let rootY = this.position.y-this.rootPosition.y;
                            let rootZ = this.position.z-this.rootPosition.z;
                            var pos = new Vector3(
                                rootX+keyXconvert,
                                rootZ+keyZconvert,
                                rootY+keyYconvert
                            );
                            /*
                                let xSide = keyXconvert-rootX;
                                let zSide = keyZconvert-rootZ;
                                let angle = Math.atan(zSide, xSide);  // Resulting angle is in radians
                                let angleInDegrees = angle * (180 / Math.PI);
                                let cookedAngle = angleInDegrees+this.rotationY;

                                let radius = Math.sqrt(Math.pow(pos.x-this.rootPosition.x,2)+Math.pow(pos.y-this.rootPosition.y,2));
                                
                                pos = new Vector3(rootX+Math.sin(cookedAngle*Math.PI/180)*radius,rootZ+Math.cos(cookedAngle*Math.PI/180)*radius,pos.z)//last part is the height
                            */
                            RigidBody.brick.setPosition(pos);
                            RigidBody.brick.setRotation(new Vector3(keyframe.Rotation.X,keyframe.Rotation.Z,keyframe.Rotation.Y))
                        }
                    });
                    await wait(this.interval/this.playSpeed);
                }
            }
        }
    }
    stop(){

    }
}

module.exports = {Rigimation};