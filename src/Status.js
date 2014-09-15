/**
 * Created by lcxfs1991 on 9/14/14.
 */


var StatusLayer = cc.Layer.extend({

    PlayScene: null,

    ctor:function (playScene) {

        this._super();

        this.PlayScene = playScene;

        this.addClock();

        return true;
    },

    addClock: function(){
        var clock = new Clock(this);

        this.addChild(clock);
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
            this.StatusLayer.removeAllChildren();
            this.StatusLayer.PlayScene.bombLayer.createBomb();
        }

        _labelNumber.setString(""+second);
    }

})