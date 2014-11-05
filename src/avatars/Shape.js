/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Shape = cc.PhysicsSprite.extend({
    drawNode: null,
    body: null,
    shape: null,
    space: null,
    layer: null,

    ctor: function( layer ) {
        this._super();
        this.layer = layer;
        this.space = layer.space;
        this._initDrawNode();
        this._initBody();
        this._initShape();
    },

    _initDrawNode: function() {
        var node = new cc.DrawNode();
        this.addChild( node, 0 );
        node.clear();
        this.drawNode = node;
    },

    _initBody: function() {
    }
})