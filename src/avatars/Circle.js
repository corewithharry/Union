/**
 * Created by Rock on 11/4/14.
 */

var Circle = Shape.extend({
    radius: 0,

    ctor: function( layer ) {
        this._init();
        this._super( layer );
//        this.drawNode.drawRect( cc.p(-this.len/4,-this.len/4), cc.p(this.len/4,this.len/4),
//            Cfg.COLOR.SQUARE, 0, Cfg.COLOR.SQUARE );
    },

    _init: function() {
        this.radius = Circle.RADIUS;
    },

    _initBody: function() {
        var mass = 1;
        var body = new cp.Body(mass, cp.momentForCircle(mass,0,this.radius,cp.vzero) );
        this.body = body;
        body.setAngle( 0 );
        body.setAngVel( 0 );
        this.setBody( body );
        this.space.addBody( body );
    },

    _initShape: function() {
        var shape = new cp.CircleShape(this.body, this.radius, cp.vzero);
        shape.setElasticity( 0 );
        shape.setFriction( 1000 );
        this.shape = shape;
        this.space.addShape( shape );
    }
})

Circle.RADIUS = 50;