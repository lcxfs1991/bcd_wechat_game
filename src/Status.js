/**
 * Created by lcxfs1991 on 9/14/14.
 */


var StatusLayer = cc.Layer.extend({

    _labelNumber: 0,
    _updateRate:0.1,
    _totalTime:0.0,
    updateNumber: 0.0,
    TotalTime: 60.0,
    number: 5.0,
    diff: 5.0,
    PlayScene: null,

    ctor:function (playScene) {

        this._super();

        this.PlayScene = playScene;

        this.addTimer();

        return true;
    },

    addTimer: function(){

        var size = cc.winSize;

        var labelName = ""+this.number;
        _labelNumber = cc.LabelTTF.create(labelName, "Arial", 24);
        _labelNumber.setColor(cc.color(232, 0, 0));
        _labelNumber.setPosition(cc.p(150, size.height - 20));

        var totalTimeName = ""+this.TotalTime+"秒";
        _totalTime = cc.LabelTTF.create(totalTimeName, "Arial", 32);
        _totalTime.setColor(cc.color(0, 0, 0));
        _totalTime.setPosition(cc.p(60, size.height - 20));


        _updateRate = 0.1;

        this.addChild(_labelNumber);
        this.addChild(_totalTime);

        this.schedule(this.updateNumber, _updateRate);

    },

    stopScheduler: function(){
        this.unschedule(this.updateNumber);
    },

    updateNumber:function() {

        this.number -= _updateRate;

        this.renewTime("normal");

        if(_labelNumber == null) return;

        _labelNumber.setString(""+Math.round(this.number * 100)/100+" 秒");
    },

    renewTime: function(status){

        if (status == "win"){
            this.TotalTime -= (this.diff - this.number);
            this.number = (this.TotalTime > 5.0)? 5.0 : this.TotalTime;
            this.diff = (this.TotalTime > 5.0)? 5.0 : this.TotalTime;
            _totalTime.setString(""+Math.round(this.TotalTime * 1)/1+" 秒");
        }
        else if (this.number <= 0){
            this.TotalTime -= (this.diff - this.number);

            if (this.TotalTime <= 0){
                this.stopScheduler();
                _totalTime.setString("0秒");
                _labelNumber.setString("0秒");

                var scene = cc.Scene.create();
                scene.addChild(new GameResultLayer(this.PlayScene.bombLayer.gameScore));
                cc.director.runScene(cc.TransitionFade.create(1.2, scene));

            }
            else {
                this.number = (this.TotalTime > 5.0)? 5.0 : this.TotalTime;
                this.diff = (this.TotalTime > 5.0)? 5.0 : this.TotalTime;
                _totalTime.setString(""+Math.round(this.TotalTime * 1)/1+" 秒");
                this.PlayScene.bombLayer.removeBomb("fail");
            }

        }

    }

});