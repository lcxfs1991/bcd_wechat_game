cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(400, 600, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    cc.director.setDisplayStats(false);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MenuScene());
    }, this);
};
cc.game.run();