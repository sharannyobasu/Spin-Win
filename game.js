let config={
    width:800,
    height:400,
    scene:{
        preload: preload,
        create: create,
        update: update,
    }
};
let game=new Phaser.Game(config);
    function preload()
    {
    this.load.image("background","Assets/back1.png");
    this.load.image("wheel","Assets/wheel.png");
    this.load.image("stand","Assets/stand.png");
    this.load.image("pin","Assets/pin.png");
    this.load.image('button', 'Assets/taptospin.png');
    this.load.audio('spinmusic', 'Assets/yt_mp3spinwheel.mp3');
    this.load.audio('sad', 'Assets/sad.mp3');
    this.load.audio('thuglife', 'Assets/thuglife.mp3');
    this.load.audio('clap', 'Assets/clap.mp3');
    
}
function create(){
    let w=game.config.width;
    let h=game.config.height;
    let nspin=1;
    this.add.sprite(w/2,h/2,"background");
    let pin=this.add.sprite(w/2+150,h/2-160,"pin").setScale(0.25);
    pin.depth=5;
    this.add.sprite(w/2+150,h/2+150,"stand").setScale(0.25);
    this.wheel=this.add.sprite(w/2+150,h/2,"wheel");
    this.wheel.setScale(0.25);
    this.button = this.add.sprite(w/2-200, h/2, 'button');
    this.button.setScale(0.10);
    this.button.setInteractive({ cursor: 'pointer'
    });
    this.input.on("pointerdown", spinwheel,this);
    
    this.add.text(w/2-265, h/2-100, "Tap on SPIN", {
            font: "bold 20px Helvetica",
            align: "center",
            color: "#008037"
    });
    
    this.prizeText = this.add.text(w/2-320, h/2 +100, "", {
            font: "bold 20px Helvetica",
            align: "center",
            color: "#008037"
    });
    this.nspin=1;
    this.add.text(w/2-265, h/2-70, "Spins left : " + this.nspin, {
            font: "bold 20px Helvetica",
            align: "center",
            color: "#008037"
    });
    
    
    
    this.spinmusic = this.sound.add('spinmusic');
    this.sad=this.sound.add("sad");
    this.thuglife=this.sound.add("thuglife");
    this.clap=this.sound.add("clap");
    
    this.canSpin = true;
    this.button.on("pointerdown",spinwheel,this);
    this.add.text(w/2-265, h/2-70, "Spins left : " + this.nspin--, {
            font: "bold 20px Helvetica",
            align: "center",
            color: "#008037"
    });
}
function update(){
    console.log("In update");
    //this.wheel.angle++;
    
}
let results = {
    count:8,
    names : ["50% off !","Amazon Vouchers !","2 extra spins","3000 CB Credits","NOTHING !!","CB Swags","100% off !","Netflix Subscription"]
}
function spinwheel(){
    
    if(this.canSpin){
        this.prizeText.setText("");
        let rounds = Phaser.Math.Between(2,4);
        let extra_degrees = Phaser.Math.Between(0,7)*50;
        let total_angle = rounds*1440 + extra_degrees;
        let n = results.count - 1 - Math.floor(extra_degrees/(360/8));
        this.canSpin = false;
        this.sound.play('spinmusic');
        
        let tween = this.tweens.add({
            targets: this.wheel,
            angle: total_angle,
            ease:"Cubic.easeOut",
            duration: 11000,
            
        
            onComplete: function(tween){
                // displaying prize text
                
                this.prizeText.setText("You win " + results.names[n]);
                if(results.names[n]=="NOTHING !!")
                    {
                        this.sound.play('sad');
                    }
                else if(results.names[n]=="Amazon Vouchers !" || results.names[n]=="Netflix Subscription")
                    {
                        this.sound.play('thuglife');
                    }
                else
                    {
                        this.sound.play('clap');
                    }
                this.canSpin = true;
            }
        });
        this.nspin=0;
        this.add.text(w/2-265, h/2-70, "Spins left : " + this.nspin, {
            font: "bold 20px Helvetica",
            align: "center",
            color: "#008037"
    });
    }
}