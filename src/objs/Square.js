/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Square = Shape.extend({
    len: 0,

    ctor: function( layer ) {
        this._init();
        this._super( layer );
        this.drawNode.drawRect( cc.p(-this.len/4,-this.len/4), cc.p(this.len/4,this.len/4),
            Cfg.COLOR.SQUARE, 0, Cfg.COLOR.SQUARE );
    },

    _init: function() {
        this.len = Square.LENGTH;
    },

    _initBody: function() {
        var mass = 1;
        var body = new cp.Body(mass, cp.momentForBox(mass, this.len, this.len) );
        this.body = body;
        body.setAngle( 0 );
        body.setAngVel( 0 );
        this.setBody( body );
        this.space.addBody( body );
    },

    _initShape: function() {
        var shape = new cp.BoxShape( this.body, this.len, this.len);
        shape.setElasticity( 0 );
        shape.setFriction( 1 );
        this.shape = shape;
        this.space.addShape( shape );
    }
})

Square.LENGTH = 100;