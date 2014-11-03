/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Player = cc.Node.extend({
    layer: null,
    shapes: [],
    _forwardSpeed: 0,
    _backwardSpeed: 0,
    speedCfg: 0,
    moveState: null,

    ctor: function( layer ) {
        this._super();
        this.layer = layer;
        this.speedCfg = Cfg.PLAYER_SPEED;
        this.setMoveState( Player.MOVE.STOP );
    },

    setMoveState: function( state ) {
        this.moveState = state;
    },

    addShape: function( shape ) {
        this.shapes.push( shape );
        this.addChild( shape, 0 );
        shape.body.setPos( cc.p(Player.POS.x,Player.POS.y) );
    },

    moveFoward: function( isMove ) {
//        if( isMove ) {
//            if( this.moveState == Player.MOVE.FORWARD ) {
//                return;
//            }
//            this.setMoveState( Player.MOVE.FORWARD );
//            this.shapes[0].body.applyForce(cp.v(Player.XFORCE,0), cp.v(-100,0));
//        } else {
//            if( this.moveState == Player.MOVE.FORWARD ) {
//                this.setMoveState( Player.MOVE.STOP );
//                this.shapes[0].body.applyForce(cp.v(-Player.XFORCE,0), cp.v(0,0));
//            }
//        }
        this._forwardSpeed = isMove ? this.speedCfg : 0;
    },

    moveBackward: function( isMove ) {
//        if( isMove ) {
//            if( this.moveState == Player.MOVE.BACKWARD ) {
//                return;
//            }
//            this.setMoveState( Player.MOVE.BACKWARD );
//            this.shapes[0].body.applyForce(cp.v(-Player.XFORCE,0), cp.v(-100,0));
//        } else {
//            if( this.moveState == Player.MOVE.BACKWARD ) {
//                this.setMoveState( Player.MOVE.STOP );
//            }
//            this.shapes[0].body.applyForce(cp.v(Player.XFORCE,0), cp.v(0,0));
//        }
        this._backwardSpeed = isMove ? this.speedCfg : 0;
    },

    jump: function() {
        this.shapes[0].body.applyImpulse(cp.v(0, Player.JFORCE), cp.v(0, 0));
        this.shapes[0].body.vx = 0;
    },

    processMove: function( dt ) {
        var speed = this._forwardSpeed - this._backwardSpeed;
        if( speed == 0 ) return;
        var p = this.shapes[0].body.getPos();
        //this.shapes[0].setPosition( cc.p(p.x+speed*dt, p.y) );
        this.shapes[0].body.setPos( cc.p(p.x+speed*dt, p.y) );
    },

    update: function( dt ) {
        this.processMove( dt );
    }
})

Player.POS = { x:300, y:700 };
Player.JFORCE = 900;
Player.XFORCE = 1500;
Player.MOVE = {
    FORWARD: 1, BACKWARD: 2, STOP: 3
};
