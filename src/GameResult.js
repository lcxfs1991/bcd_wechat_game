/**
 * Created by lcxfs1991 on 9/14/14.
 */


var GameResultLayer = cc.Layer.extend({

    gameScore: 0,
    shareBtn: null,
    followBtn: null,

    ctor:function (gameScore) {

        this._super();

        this.gameScore = gameScore;

        var size = cc.winSize;
        var bg = new bgSprite();
        bg.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(bg);

        this.displayResult();

        this.addBtn();

        return true;
    },

    displayResult: function(){

        var size = cc.winSize;

        var result = "你打爆了"+this.gameScore+"个痴呆球\n抗痴呆指数级\n击败了全国选手\n爱父母就请关注我们!\n";
        resultText = cc.LabelTTF.create(result, "Arial", 25);
        resultText.setColor(cc.color(0, 0, 0));
        resultText.setPosition(cc.p(size.width / 2, size.height / 2 + 200));

        this.addChild(resultText);

    },

    addBtn : function(){

        var size = cc.winSize;

        this.shareBtn = new cc.MenuItemSprite(
            new GameBtn("分享到朋友圈"),
            new GameBtn("分享到朋友圈"),
            this.onShare, this);

        this.followBtn = new cc.MenuItemSprite(
            new GameBtn("抓住黄金干预期，请关注我们"),
            new GameBtn("抓住黄金干预期，请关注我们"),
            this.onFollow, this);


        this.testBtn = new cc.MenuItemSprite(
            new GameBtn("简易智能状态检测"),
            new GameBtn("简易智能状态检测"),
            this.onTest, this);

        this.restartBtn = new cc.MenuItemSprite(
            new GameBtn("重新开始"),
            new GameBtn("重新开始"),
            this.onRestart, this);



        var menu1 = cc.Menu.create(this.shareBtn);
        menu1.setPosition(cc.p(size.width / 2, size.height / 2 + 100));
        this.addChild(menu1);

        var menu2 = cc.Menu.create(this.followBtn);
        menu2.setPosition(cc.p(size.width / 2, size.height / 2 + 20));
        this.addChild(menu2);

        var menu3 = cc.Menu.create(this.testBtn);
        menu3.setPosition(cc.p(size.width / 2, size.height / 2 - 60));
        this.addChild(menu3);

        var menu4 = cc.Menu.create(this.restartBtn);
        menu4.setPosition(cc.p(size.width / 2, size.height / 2 - 140));
        this.addChild(menu4);


    },

    onShare: function(){
        var winsize = cc.director.getWinSize();

        var shareBG = cc.LayerColor.create(cc.color(0,0,0), 400, 600);
        shareBG.setOpacity(200);
        this.addChild(shareBG);

        var shareMethod1 = cc.LabelTTF.create("点击右上角菜单", "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 32);
        shareMethod1.setColor(cc.color(255, 255, 255));
        shareMethod1.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 40));
        shareBG.addChild(shareMethod1);

        var shareMethod1 = cc.LabelTTF.create("分享到朋友圈!", "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 32);
        shareMethod1.setColor(cc.color(255, 255, 255));
        shareMethod1.setPosition(cc.p(winsize.width / 2, winsize.height / 2));
        shareBG.addChild(shareMethod1);

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.
                var target = event.getCurrentTarget();
                target.parent.removeChild(target);


            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
            }
        });

        cc.eventManager.addListener(listener1, shareBG);
    },

    onFollow: function(){
        window.document.location = "http://mp.weixin.qq.com/s?__biz=MjM5MzYxNTAwOQ==&mid=201235767&idx=1&sn=c7b314db364eab91c89af656920ed184#rd";
    },

    onTest: function(){
        window.document.location = "http://leehey.org/bcd";
    },

    onRestart: function(){
        cc.director.runScene(new PlayScene());
    }

});

var GameResultScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        this.initData();
    },

    initData: function(){

        var gameResultLayer = new GameResultLayer();
        this.addChild(gameResultLayer);

    }
});


var GameBtn = cc.Sprite.extend({

    ctor:function (text) {

        this._super();

        var size = cc.winSize;

        var drawnode = cc.DrawNode.create();

        drawnode.drawRect(cc.p(0,0), cc.p(300,50), cc.color(0,0,0,255));

        this.addChild(drawnode);


        var MsgLabel = new cc.LabelTTF(text, "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 20);
        MsgLabel.setColor(cc.color(255, 255, 255));
        MsgLabel.setPosition(cc.p(150, 25));
        this.addChild(MsgLabel);

        this.width = 300;
        this.height = 50;

    }

})