/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Floor = cc.Node.extend({
    layer: null,
    drawNode: null,
    cfg: null,
    shape: null,
    mgr: null,
    space: null,

    ctor: function ( mgr, cfg ) {
        this._super();
        this.cfg = cfg;
        this.mgr = mgr;
        this.space = mgr.space;
        this._initDrawNode();
        this._initShape();
    },

    _initDrawNode: function() {
        var cfg = this.cfg;
        var node = new cc.DrawNode();
        node.clear();
        this.addChild( node, 0 );
//        node.drawRect( cc.p(cfg.x,cfg.y-cfg.height/2), cc.p(cfg.x+cfg.width,cfg.y+cfg.height/2),
//            Cfg.COLOR.FLOOR, 0, Cfg.COLOR.FLOOR );
        this.drawNode = node;
    },

    _initShape: function() {
        var space = this.space;
        var cfg = this.cfg;
        this.shape = space.addShape(new cp.SegmentShape(space.staticBody,
            cc.p(cfg.x,cfg.y), cc.p(cfg.x+cfg.width, cfg.y+cfg.slope), cfg.height));
        this.shape.setElasticity( 0 );
        this.shape.setFriction( 1 );
    }

})