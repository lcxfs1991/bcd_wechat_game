/**
 * Created by lcxfs1991 on 9/14/14.
 */


var StatusLayer = cc.Layer.extend({

    PlayScene: null,
    gameNumber: 1,
    winGame: 0,
    failGame:0,
    clock: null,
    _GameNumText: null,
    _GameWinText: null,
    _GameFailText: null,

    ctor:function (playScene) {

        this._super();

        this.PlayScene = playScene;

        this.addClock();

        return true;
    },

    addClock: function(){

        cc.log(this.gameNumber);
        this.updateGame();

        if (this.gameNumber == 0){

            var scene = cc.Scene.create();
            scene.addChild(new GameResultLayer(this.PlayScene));
            cc.director.runScene(cc.TransitionFade.create(1.2, scene));

        }
        else {

            this.clock = new Clock(this);

            this.addChild(this.clock);
        }


    },

    updateGame: function(){

        if (this._GameNumText){
            this.removeChild(this._GameNumText);
        }

        if (this._GameWinText){
            this.removeChild(this._GameWinText);
        }

        if (this._GameFailText){
            this.removeChild(this._GameFailText);
        }

        var size = cc.winSize;

        var GameNum = ""+this.gameNumber;
        this._GameNumText = cc.LabelTTF.create(GameNum+" / 10 局", "Arial", 25);
        this._GameNumText.setColor(cc.color(0, 0, 0));
        this._GameNumText.setPosition(cc.p(80, size.height - 30));
        this.addChild(this._GameNumText);

        var WinNum = ""+this.winGame;
        this._GameWinText = cc.LabelTTF.create("胜: "+WinNum, "Arial", 25);
        this._GameWinText.setColor(cc.color(0, 0, 0));
        this._GameWinText.setPosition(cc.p(200, size.height - 30));

        this.addChild(this._GameWinText);

        var FailNum = ""+this.failGame;
        this._GameFailText = cc.LabelTTF.create("负: "+FailNum, "Arial", 25);
        this._GameFailText.setColor(cc.color(0, 0, 0));
        this._GameFailText.setPosition(cc.p(280, size.height - 30));

        this.addChild(this._GameFailText);


    }

});


var Clock = cc.Sprite.extend({

    radius: 50,
    _labelNumber: 0,
    _updateRate:0.1,
    updateNumber: 0.0,
    number: 3.0,
    gap: 3.0,
    StatusLayer: null,

    ctor:function (statusLayer) {

        this._super();

        this.StatusLayer = statusLayer;

        var drawnode = cc.DrawNode.create();

        drawnode.drawDot(cc.p(0, 0), this.radius, cc.color(0,0,0,255));

        this.width = this.radius;
        this.height = this.radius;

        var size = cc.winSize;

        this.x = size.width / 2 + this.radius / 2;
        this.y = size.height / 2  + this.radius / 2;

        this.addChild(drawnode);

        this.countDown();

    },

    countDown: function(){
        var size = cc.winSize;

        var labelName = ""+this.number;
        _labelNumber = cc.LabelTTF.create(labelName, "Arial", 30);
        _labelNumber.setColor(cc.color(232, 0, 0));
        _labelNumber.setPosition(cc.p(0,0));

        _updateRate = 0.1;

        this.addChild(_labelNumber);

        this.schedule(this.updateNumber, _updateRate);
    },

    stopScheduler: function(){
        this.unschedule(this.updateNumber);
    },

    updateNumber:function() {

        this.number -= _updateRate;

        if(_labelNumber == null) return;

        var second = Math.round(this.number);

        if (second == 0){
            this.stopScheduler();
            this.StatusLayer.removeChild(this.StatusLayer.clock);
            this.StatusLayer.PlayScene.bombLayer.createBomb();
        }

        _labelNumber.setString(""+second);
    }

})