/**
 * Created by lcxfs1991 on 9/13/14.
 */


var BombLayer = cc.Layer.extend({

    BombArray : [],
    BombCoordArray : [],
    BombColorArray: [],
    randFigure: [],
    radius: 30,
    gap: 40,
    current: 0,
    number: 0,
    gameScore: 0,
    PlayScene: null,

    ctor:function (playScene, number) {

        this._super();
        this.PlayScene = playScene;
        this.number = number;

        this.BombColorArray[0] = cc.color(52, 152, 219);
        this.BombColorArray[1] = cc.color(46, 204, 113);
        this.BombColorArray[2] = cc.color(26, 188, 156);
        this.BombColorArray[3] = cc.color(241, 196, 15);
        this.BombColorArray[4] = cc.color(230, 126, 34);

    },

    createBomb: function(){

        var figure = null;
        var duplicate = false;

        var numberPicker = [];

        for (var i = 1; i <=15; i++){
            numberPicker[i - 1] = i;
        }

        var pickerNum = 14;
        var index = null;

        for (var i = 0; i < this.number; i++){

            index = this.getRandom(0, pickerNum);

            this.randFigure.push(numberPicker[index]);

            numberPicker.splice(index, 1);

            pickerNum--;

        }

        this.randFigure.sort(function(a, b){

            return a - b;
        });

        cc.log("rand length"+this.randFigure);

        var bombColor = this.BombColorArray[this.getRandom(0, 4)];

        for (var i = 0; i < this.number; i++){

            var bomb = new Bomb(this, this.getCoord(this.BombCoordArray), this.randFigure[i], bombColor);

            this.BombArray.push(bomb);

            this.addChild(bomb);

        }

        this.hideIndex();
    },

    hideIndex: function(){

        _totalTime = 2;
        _updateRate = 0.1;

        this.schedule(this.updateTime, _updateRate);

    },

    updateTime: function(){

       _totalTime -= _updateRate;

        var second = Math.round(_totalTime);

        if (second == 0){
            this.stopScheduler("updateTime");
            _totalTime = 2;

            for (var i = 0; i < this.BombArray.length; i++){
                this.BombArray[i].hideIndex();
            }
        }
    },

    stopScheduler: function(func){
        this.unschedule(this[func]);
    },

    removeBomb: function(status){

        this.removeAllChildren();

        for (var i = 0; i < this.BombArray.length; i++){
            this.BombArray.pop();

            this.BombCoordArray.pop();
        }

        for (var i = 0; i < this.number; i++){
            this.randFigure.pop();
        }

        if (status == "win"){
            this.gameScore = this.number;
            this.number++;
        }
        else if (status == "fail"){
        }

        this.current = 0;
//        this.createBomb();
        this.PlayScene.statusLayer.addClock();

    },

    getCoord: function(BombCoordArray){

        var coord = {};
        var x = 0;
        var y = 0;
        var collision = false;

        while(1){

            x = this.getRandom(this.radius, 400 - this.radius - 50);
            y = this.getRandom(this.radius, 600 - this.radius - 50);

            collision = true;

            for (var i = 0; i < BombCoordArray.length; i++){

                if (this.checkCollision(x, y, BombCoordArray[i])){
                    collision = false;
                    break;
                }

            }

            if (collision){
                coord.x = x;
                coord.y = y;
                this.BombCoordArray.push(coord);
                break;
            }

        }

        return coord;

    },

    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    checkCollision: function(x, y, coord){

        if (Math.pow((coord.x - x), 2) + Math.pow((coord.y - y), 2) < Math.pow(this.radius + this.gap, 2)){
            return true;
        }
        else {
            return false;
        }
    },

    checkNum: function(index){

        cc.log(index+"-"+this.randFigure.indexOf(index));

        if (this.randFigure.indexOf(index) == this.current){

            this.current++;
            if (this.current == this.number){
                this.number++;
                this.waitNext("win");

                this.PlayScene.statusLayer.gameNumber--;
                this.PlayScene.statusLayer.winGame++;

                return "win";
            }

            return "normal";

        }
        else {
            this.waitNext("fail");

            this.PlayScene.statusLayer.gameNumber--;
            this.PlayScene.statusLayer.failGame++;

            return "fail";

        }

    },

    waitNext: function(status){
        _waitTime = 1;
        _updateRate = 0.1;

        this.schedule(this.updateNext, _updateRate, status);
    },

    updateNext: function(){

        _waitTime -= _updateRate;

        var second = Math.round(_waitTime);

        if (second == 0){
            this.stopScheduler("updateNext");
            _waitTime = 1;

            this.removeBomb(status);
        }

    },

    explode: function(x, y){

        var explode = cc.Sprite.create(res.Explosion_png);
        explode.setPosition(cc.p(x, y));
        explode.setScale(0);

        var explodeAni = cc.sequence(
            cc.rotateTo(0.1, 180),
            cc.scaleTo(0.1, 3)
        );

        explode.runAction(explodeAni);
        this.addChild(explode);

        var explodeAniRev = cc.sequence(
            cc.rotateTo(0.2, 180),
            cc.scaleTo(0.2, 0)
        );

        explode.runAction(explodeAniRev);
        explode.release();
    },

    cross: function(x, y){

        var cross = cc.Sprite.create(res.Cross_png);
        cross.setPosition(cc.p(x, y));

        var crossAni = cc.sequence(
            cc.fadeOut(0.3),
            cc.fadeIn(0.3),
            cc.fadeOut(0.3),
            cc.fadeIn(0.3),
            cc.fadeOut(0.3)
        );

        cross.runAction(crossAni);
        this.addChild(cross);

        cross.release();

    }

});


var Bomb = cc.Sprite.extend({

    index: null,
    radius: 30,
    BombLayer: null,
    MsgLabel: null,

    ctor:function (BombLayer, coord, index, bombColor) {

        this._super();
        this.BombLayer = BombLayer;
        this.index = index;
        var drawnode = cc.DrawNode.create();

        drawnode.drawDot(cc.p(0, 0), this.radius, bombColor);

        this.width = this.radius;
        this.height = this.radius;
        this.x = coord.x;
        this.y = coord.y;

        this.addChild(drawnode);
        this.addIndex();

    },

    addIndex: function(){

        this.MsgLabel = new cc.LabelTTF(this.index, "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 20);
        this.MsgLabel.setColor(cc.color(255, 255, 255));
        this.MsgLabel.setPosition(cc.p(0, 0));
        this.addChild(this.MsgLabel);
    },

    hideIndex: function(){
        this.removeChild(this.MsgLabel);
        this.tab();
    },

    tab: function(){

        //Create a "one by one" touch event listener (processes one touch at a time)
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.
                var target = event.getCurrentTarget();

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(-target.radius , -target.radius, s.width * 2, s.height * 2);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {

                    var result = target.BombLayer.checkNum(target.index);

                    if (result == "fail"){
                        target.parent.cross(target.getPosition().x, target.getPosition().y);
                    }
                    else {
                        target.parent.explode(target.getPosition().x, target.getPosition().y);
                    }

                    return true;
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {

            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                target.removeAllChildren();
                target.parent.removeChild(target);
            }
        });

        cc.eventManager.addListener(this.listener, this);

    }

})