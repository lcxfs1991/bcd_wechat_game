/**
 * Created by lcxfs1991 on 9/14/14.
 */


var GameResultLayer = cc.Layer.extend({

    gameScore: 0,
    shareBtn: null,
    followBtn: null,
    PlayScene: null,
    Msg: null,

    ctor:function (playScene) {

        this._super();

        this.PlayScene = playScene;

        this.gameScore = this.PlayScene.statusLayer.winGame * 10 + this.PlayScene.statusLayer.failGame * 2;

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

        var percent = this.getPercent(this.gameScore);

        this.Msg = "拼脑力, 你的\"不痴呆\"指数是"+this.gameScore+"。\n击败了"+percent+"%全国选手。\n关注不痴呆专业脑健康平台!\n今天是中华老年痴呆防治日,\n爱父母，从关注脑健康开始。";
        resultText = cc.LabelTTF.create(this.Msg, "Arial", 25);
        resultText.setColor(cc.color(0, 0, 0));
        resultText.setPosition(cc.p(size.width / 2, size.height / 2 + 200));

        var imgUrl = 'http://buchidai.org/bgame/res/logo.png';
        var lineLink = 'http://buchidai.org/bgame/';
        Wechat.descContent = "拼脑力, 我的\"不痴呆\"指数是"+this.gameScore+"。\n击败了"+percent+"%全国选手。\n关注不痴呆专业脑健康平台!\n今天是中华老年痴呆防治日,\n爱父母，从关注脑健康开始。";
        Wechat.shareTitle = Wechat.descContent;
        document.title = Wechat.descContent;

        shareTimeline(imgUrl, lineLink, Wechat.descContent, Wechat.shareTitle);

        this.addChild(resultText);

    },

    getPercent: function(gameScore){

        var percent = 0;

        if (gameScore >= 0 && gameScore <= 20){
            percent = gameScore / 20 * 5 / 100 * 100;
        }
        else if (gameScore >= 21 && gameScore <= 40){
            percent = 5 + (gameScore - 21) / 20 * 25 / 100 * 100;
        }
        else if (gameScore >= 41 && gameScore <= 60){
            percent = 25 + (gameScore - 41) / 20 * 40 / 100 * 100;
        }
        else if (gameScore >= 61 && gameScore <= 80){
            percent = 70 + (gameScore - 61) / 20 * 25 / 100 * 100;
        }
        else if (gameScore >= 81 && gameScore <= 100){
            percent = 95 + (gameScore - 81) / 20 * 5 / 100 * 100;
        }

        return Math.round(percent);

    },

    addBtn : function(){

        var size = cc.winSize;

        this.shareBtn = new cc.MenuItemSprite(
            new GameBtn("快请小伙伴们测一测(游戏版)"),
            new GameBtn("快请小伙伴们测一测(游戏版)"),
            this.onShare, this);

        this.testBtn = new cc.MenuItemSprite(
            new GameBtn("快帮父母大人查一查(专业版)"),
            new GameBtn("快帮父母大人查一查(专业版)"),
            this.onTest, this);

        this.followBtn = new cc.MenuItemSprite(
            new GameBtn("关注\"不痴呆\"专业脑健康平台"),
            new GameBtn("关注\"不痴呆\"专业脑健康平台"),
            this.onFollow, this);


        this.restartBtn = new cc.MenuItemSprite(
            new GameBtn("没玩够, 再做一次"),
            new GameBtn("没玩够, 再做一次"),
            this.onRestart, this);



        var menu1 = cc.Menu.create(this.shareBtn);
        menu1.setPosition(cc.p(size.width / 2, size.height / 2 + 80));
        this.addChild(menu1);

        var menu2 = cc.Menu.create(this.testBtn);
        menu2.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(menu2);

        var menu3 = cc.Menu.create(this.followBtn);
        menu3.setPosition(cc.p(size.width / 2, size.height / 2 - 80));
        this.addChild(menu3);

        var menu4 = cc.Menu.create(this.restartBtn);
        menu4.setPosition(cc.p(size.width / 2, size.height / 2 - 160));
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
        window.document.location = "http://mp.weixin.qq.com/s?__biz=MjM5MzYxNTAwOQ==&mid=201251473&idx=1&sn=d9acaa25d96112754a41653a0ed6936a#rd";
    },

    onTest: function(){
        window.document.location = "http://buchidai.org/bcdtest/";
    },

    onRestart: function(){
        cc.director.runScene(new PlayScene());
    }

});


var GameBtn = cc.Sprite.extend({

    ctor:function (text) {

        this._super();

        var size = cc.winSize;

        var drawnode = cc.DrawNode.create();

        drawnode.drawRect(cc.p(0,0), cc.p(300,50), cc.color(231, 76, 60, 255));

        this.addChild(drawnode);


        var MsgLabel = new cc.LabelTTF(text, "STHeiti Droidsansfallback Dengxian Microsoft JhengHei STHeiti", 20);
        MsgLabel.setColor(cc.color(255, 255, 255));
        MsgLabel.setPosition(cc.p(150, 25));
        this.addChild(MsgLabel);

        this.width = 300;
        this.height = 50;

    }

})
