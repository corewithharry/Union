/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Mover = cc.Sprite.extend({
    layer: null,
    ctor: function( layer ) {
        this._super();
        this.layer = layer;
    }
})