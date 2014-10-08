/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Shape = cc.PhysicsSprite.extend({
    drawNode: null,
    body: null,
    shape: null,

    ctor: function() {
        this._super();
        var node = new cc.DrawNode();
        this.addChild( node, 0 );
        node.clear();
        this.drawNode = node;
        this._initBody();
        this._initShape();
    },

    _initBody: function() {
//        var body = new cp.Body(1, cp.momentForBox(1, 100, 100) );
//        body.setPos( cc.p(0,0) );
//        this.body = body;
//        this.setBody( body );
    }
})