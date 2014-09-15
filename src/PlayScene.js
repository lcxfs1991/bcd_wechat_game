/**
 * Created by lcxfs1991 on 9/13/14.
 */

var PlayLayer = cc.Layer.extend({

    layer: null,
    bombLayer: null,
    statusLayer: null,

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

        return true;
    },

    onPlay: function(){
        cc.director.runScene(new PlayScene());
    }

});



var PlayScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        this.initData();
    },

    initData: function(){

        this.layer = new PlayLayer();
        this.addChild(this.layer);

        this.bombLayer = new BombLayer(this, 3);
        this.addChild(this.bombLayer);

        this.statusLayer = new StatusLayer(this);
        this.addChild(this.statusLayer);

    }
});