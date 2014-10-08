/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Player = cc.Node.extend({
    layer: null,
    shapes: [],
    _forwardSpeed: 0,
    _backwardSpeed: 0,
    speedCfg: 0,
    ctor: function( layer ) {
        this._super();
        this.layer = layer;
        this.speedCfg = Cfg.PLAYER_SPEED;
    },

    addShape: function( shape ) {
        this.shapes.push( shape );
        this.addChild( shape, 0 );
    },

    moveFoward: function( isMove ) {
        this.shapes[0].body.applyImpulse(cp.v(150, 0), cp.v(0, 0));
        //this._forwardSpeed = isMove ? this.speedCfg : 0;
    },

    moveBackward: function( isMove ) {
        this._backwardSpeed = isMove ? this.speedCfg : 0;
    },

    processMove: function( dt ) {
        var speed = this._forwardSpeed - this._backwardSpeed;
        if( speed == 0 ) return;
        var p = this.shapes[0].getPosition();
        this.shapes[0].setPosition( cc.p(p.x+speed*dt, p.y) );
    },

    update: function( dt ) {
        this.processMove( dt );
    }
})
