/**
 * Created by Rock on 11/4/14.
 */

var Triangle = Shape.extend({
    len: 0,

    ctor: function( layer ) {
        this._init();
        this._super( layer );
//        this.drawNode.drawRect( cc.p(-this.len/4,-this.len/4), cc.p(this.len/4,this.len/4),
//            Cfg.COLOR.SQUARE, 0, Cfg.COLOR.SQUARE );
    },

    _init: function() {
        this.len = Triangle.LENGTH;
    },

    _initBody: function() {
        var mass = 1;
        var verts = [
            -this.len/2, -this.len/2,
            0, this.len/2,
            this.len/2, -this.len/2
        ];
        var body = new cp.Body(mass, cp.momentForPoly(mass, verts, cp.vzero) );
        this.body = body;
        body.setAngle( 0 );
        body.setAngVel( 0 );
        this.setBody( body );
        this.space.addBody( body );
    },

    _initShape: function() {
        var verts = [
            -this.len/2, -this.len/2,
            0, this.len/2,
            this.len/2, -this.len/2
        ];
        var shape = new cp.PolyShape(this.body, verts, cp.vzero);
        shape.setElasticity( 0 );
        shape.setFriction( 1 );
        this.shape = shape;
        this.space.addShape( shape );
    }
})

Triangle.LENGTH = 80;