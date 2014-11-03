/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Player = cc.Node.extend({
    layer: null,
    shapes: [],
    _forwardSpeed: 0,
    _backwardSpeed: 0,
    _ySpeed: 0,
    speedCfg: 0,
    moveState: null,
    mainShape: null,
    state: null,

    ctor: function( layer ) {
        this._super();
        this.layer = layer;
        this.speedCfg = Player.SPEED;
        this._initSpeed();
        this.setState( Player.STATE.FLY );
        this.setMoveState( Player.MOVE.STOP );
    },

    _initSpeed: function() {
        this._ySpeed = 0;
        this._forwardSpeed = 0;
        this._backwardSpeed = 0;
    },

    setState: function( state ) {
        this.state = state;
    },

    setMoveState: function( state ) {
        this.moveState = state;
    },

    addShape: function( shape ) {
        this.shapes.push( shape );
        this.addChild( shape, 0 );
        shape.body.setPos( cc.p(Player.POS.x,Player.POS.y) );
        this.mainShape = shape;
        this.mainShape.shape.setCollisionType( Cfg.TAGS.PLAYER );
    },

    moveFoward: function( isMove ) {
        this._forwardSpeed = isMove ? this.speedCfg : 0;
    },

    moveBackward: function( isMove ) {
        this._backwardSpeed = isMove ? this.speedCfg : 0;
    },

    jump: function() {
        if( this.state == Player.STATE.FLY ) return;
        this._ySpeed += Player.JFORCE;
        this.setState( Player.STATE.FLY );
    },

    processMove: function( dt ) {
        var speed = this._forwardSpeed - this._backwardSpeed;
        var p = this.getPos();
        var x = p.x + speed * dt;
        var y = p.y + this._ySpeed * dt;
        this.setPos( cc.p(x, y) );
    },

    processGravity: function( dt ) {
        if( this.state == Player.STATE.FLOOR ) return;
        this._ySpeed -= Cfg.GRAVITY * dt;
    },

    getPos: function() {
        return this.mainShape.body.getPos();
    },

    setPos: function( pos ) {
        this.mainShape.body.setPos(pos);
    },

    update: function( dt ) {
        this.processMove( dt );
        this.processGravity( dt );
    },

    onHitFloor: function( arbiter, space ) {
//        var shapes = arbiter.getShapes();
        this.setState( Player.STATE.FLOOR );
        this._ySpeed = 0;
    }
})

Player.POS = { x:300, y:700 };
Player.JFORCE = 500;
Player.SPEED = 400;
Player.MOVE = {
    FORWARD: 1, BACKWARD: 2, STOP: 3
};
Player.STATE = {
    FLOOR: 1, FLY: 2
}
