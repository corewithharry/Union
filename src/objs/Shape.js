/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Shape = cc.Sprite.extend({
    drawNode: null,
    ctor: function() {
        this._super();
        var node = new cc.DrawNode();
        this.addChild( node, 0 );
        node.clear();
        this.drawNode = node;
    }
})