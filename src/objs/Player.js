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
    mainShape: null,

    ctor: function( layer ) {
        this._super();
        this.layer = layer;
        this.speedCfg = Player.SPEED;
        this.setMoveState( Player.MOVE.STOP );
    },

    setMoveState: function( state ) {
        this.moveState = state;
    },

    addShape: function( shape ) {
        this.shapes.push( shape );
        this.addChild( shape, 0 );
        shape.body.setPos( cc.p(Player.POS.x,Player.POS.y) );
        this.mainShape = shape;
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
        this.mainShape.body.applyImpulse(cp.v(0, Player.JFORCE), cp.v(0, 0));
        this.mainShape.body.vx = 0;
    },

    processMove: function( dt ) {
        var speed = this._forwardSpeed - this._backwardSpeed;
        if( speed == 0 ) return;
        var p = this.getPos();
        this.setPos( cc.p(p.x+speed*dt, p.y) );
    },

    getPos: function() {
        return this.mainShape.body.getPos();
    },

    setPos: function( pos ) {
        this.mainShape.body.setPos(pos);
    },

    update: function( dt ) {
        this.processMove( dt );
    }
})

Player.POS = { x:300, y:700 };
Player.JFORCE = 900;
Player.XFORCE = 1500;
Player.SPEED = 400;
Player.MOVE = {
    FORWARD: 1, BACKWARD: 2, STOP: 3
};
