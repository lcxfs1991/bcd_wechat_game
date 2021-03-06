
var MenuLayer = cc.Layer.extend({

    ctor:function () {

        this._super();

        var size = cc.winSize;

        this.startBtn = new cc.MenuItemSprite(
            new menuSprite(),
            new menuSprite(),
            this.onPlay, this);

        var bg = new bgSprite();
        bg.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(bg);


        var menu = cc.Menu.create(this.startBtn);
        menu.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(menu);


        return true;
    },

    onPlay: function(){
        cc.director.runScene(new PlayScene());
    }

});


var bgSprite =cc.Sprite.extend({

    ctor:function () {

        this._super();

        var size = cc.winSize;

        //set sprite size
        this.width = 400;
        this.height = 600;

        var drawnode = cc.DrawNode.create();

        drawnode.drawRect(cc.p(0,0), cc.p(size.width,size.height), cc.color(255,255,255,255));

        this.addChild(drawnode);

    }

})


var menuSprite =cc.Sprite.extend({

    ctor:function () {

        this._super();

        var size = cc.winSize;

        //set sprite size
        this.width = 200;
        this.height = 50;

        var drawnode = cc.DrawNode.create();

        drawnode.drawRect(cc.p(0,0), cc.p(200,50), cc.color(0,0,0,255));

        this.addChild(drawnode);


        var MsgLabel = new cc.LabelTTF("游戏开始", "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 20);
        MsgLabel.setColor(cc.color(255, 255, 255));
        MsgLabel.setPosition(cc.p(100, 25));
        this.addChild(MsgLabel);

    }

})

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});



