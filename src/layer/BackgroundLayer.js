/**
 * Created by Rock on 11/2/14.
 */

var BackgroundLayer = cc.LayerColor.extend({
    scene: null,
    gameLayer: null,


    ctor: function (scene) {
        this._super();
        this.scene = scene;
        this.setColor( Cfg.COLOR.LAYER );
        this.gameLayer = new GameLayer( scene );
        this.addChild( this.gameLayer, 0 );
    }
})