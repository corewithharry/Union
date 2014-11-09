/**
 * Created by Rock on 11/5/14.
 */


var PlatformLayer = cc.Node.extend({
    layer: null,
    player: null,
    space: null,

    ctor: function (gameLayer) {
        this._super();
        this.layer = gameLayer;
        this.player = gameLayer.player;
        this.space = gameLayer.space;
    }
})