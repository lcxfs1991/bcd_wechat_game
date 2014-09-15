/**
 * Created by lcxfs1991 on 9/13/14.
 */


var BombLayer = cc.Layer.extend({

    BombArray : [],
    BombCoordArray : [],
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
//        this.createBomb();

    },

    createBomb: function(){

        for (var i = 0; i < this.number; i++){

            var bomb = new Bomb(this, this.getCoord(this.BombCoordArray), i);

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
            this.stopScheduler();
            _totalTime = 2;

            for (var i = 0; i < this.BombArray.length; i++){
                this.BombArray[i].hideIndex();
            }
        }
    },

    stopScheduler: function(){
        this.unschedule(this.updateNumber);
    },

    removeBomb: function(status){

        this.removeAllChildren();

        for (var i = 0; i < this.BombArray.length; i++){
            this.BombArray.pop();
        }

        for (var i = 0; i < this.BombCoordArray.length; i++){
            this.BombCoordArray.pop();
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

        if (index == this.current){

            this.current++;
            if (this.current == this.number){
                this.removeBomb("win");
            }

        }
        else {
            this.removeBomb("fail");

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
    }

});


//var Rectangle = cc.Sprite.extend({
//    ctor:function(){
//        this._super();
//
//        this.x = 50;
//        this.y = 50;
//        this.width = 100;
//        this.height = 100;
//
//        var dt = cc.DrawNode.create();
//        dt.drawDot(cc.p(100,100), 30, cc.color(100,100,100,255));
////        dt.drawRect(cc.p(0,0), cc.p(100, 100), cc.color(100,100, 100, 255));
//        this.addChild(dt);
//
//    }
//});

var Bomb = cc.Sprite.extend({

    index: null,
    radius: 30,
    BombLayer: null,
    MsgLabel: null,

    ctor:function (BombLayer, coord, index) {

        this._super();
        this.BombLayer = BombLayer;
        this.index = index;
        var drawnode = cc.DrawNode.create();

        drawnode.drawDot(cc.p(0, 0), this.radius, cc.color(0,0,0,255));

        this.width = this.radius;
        this.height = this.radius;
        this.x = coord.x;
        this.y = coord.y;

        this.addChild(drawnode);
        this.addIndex();

    },

    addIndex: function(){

        this.MsgLabel = new cc.LabelTTF(this.index + 1, "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 20);
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
//                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    target.BombLayer.checkNum(target.index);
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

                target.parent.explode(target.getPosition().x, target.getPosition().y);
                target.removeAllChildren();
                target.parent.removeChild(target);
            }
        });

        cc.eventManager.addListener(this.listener, this);

    }

})