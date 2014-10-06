
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
        menu.setPosition(cc.p(size.width/2, size.height/2 - 100));
        this.addChild(menu);


        var Intro = new cc.LabelTTF("击爆痴呆球(新版)--脑力测试\n", "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 30);
        Intro.setColor(cc.color(231, 76, 60));
        Intro.setPosition(cc.p(size.width / 2, size.height - 50));
        this.addChild(Intro);

        var Festival = new cc.LabelTTF("10月2日是重阳节,\n教家中老人玩一款\n防止脑退化的游戏,\n\"击爆痴呆球\",\n完成10道题测试你的脑力\n", "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 25);
        Festival.setColor(cc.color(0, 0, 0));
        Festival.setPosition(cc.p(size.width / 2, size.height - 150));
        this.addChild(Festival);

        var Rule = new cc.LabelTTF("游戏方法: \n瞬间记忆痴呆球上的数字, \n数字消失后,\n按从小到大的顺序击球。", "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 25);
        Rule.setColor(cc.color(211, 84, 0));
        Rule.setPosition(cc.p(size.width / 2, size.height - 280));
        this.addChild(Rule);

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

        drawnode.drawRect(cc.p(0,0), cc.p(200,50), cc.color(231, 76, 60, 255));

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



