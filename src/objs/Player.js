/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Player = cc.Node.extend({
    layer: null,
    platform: null,
    floorMgr: null,
    avatars: [],
    _forwardSpeed: 0,
    _backwardSpeed: 0,
    _ySpeed: 0,
    speedCfg: 0,
    moveState: null,
    mainAvatar: null,
    curFloor: null,
    state: null,
    gravity: 0,
    onFloorCount: 0,
    offset: {x:-1000,y:0},

    ctor: function( layer ) {
        this._super();
        this.layer = layer;
        this.speedCfg = Player.SPEED;
        this._initSpeed();
        this.setState( Player.STATE.FLY );
        this.setMoveState( Player.MOVE.STOP );
        this.gravity = Cfg.GRAVITY;
    },

    _initSpeed: function() {
        this._ySpeed = 0;
        this._forwardSpeed = 0;
        this._backwardSpeed = 0;
    },

    setFloorMgr: function( mgr ) {
        this.floorMgr = mgr;
    },

    setPlatformLayer: function( layer ) {
        this.platform = layer;
    },

    setState: function( state ) {
        this.state = state;
    },

    setMoveState: function( state ) {
        this.moveState = state;
    },

    addAvatar: function( avatar ) {
        this.avatars.push( avatar );
        this.addChild( avatar, 0 );
        avatar.body.setPos( cc.p(Player.POS.x,Player.POS.y) );
        this.mainAvatar = avatar;
        this.mainAvatar.shape.setCollisionType( Cfg.TAGS.PLAYER );
    },

    moveFoward: function( isMove ) {
        this._forwardSpeed = isMove ? this.speedCfg : 0;
        if( this._forwardSpeed - this._backwardSpeed > 0 ){
            this.setMoveState( Player.MOVE.FORWARD );
        } else if( this._forwardSpeed - this._backwardSpeed < 0 ) {
            this.setMoveState( Player.MOVE.BACKWARD );
        } else {
            this.setMoveState( Player.MOVE.STOP );
        }
    },

    moveBackward: function( isMove ) {
        this._backwardSpeed = isMove ? this.speedCfg : 0;
        if( this._forwardSpeed - this._backwardSpeed > 0 ){
            this.setMoveState( Player.MOVE.FORWARD );
        } else if( this._forwardSpeed - this._backwardSpeed < 0 ) {
            this.setMoveState( Player.MOVE.BACKWARD );
        } else {
            this.setMoveState( Player.MOVE.STOP );
        }
    },

    jump: function() {
        if( this.state == Player.STATE.FLY ) return;
//        this._ySpeed += Player.JFORCE;
        this.setState( Player.STATE.FLY );
        this.mainAvatar.body.vx = 0;
        this.mainAvatar.body.v_biasx = 0;
        this.mainAvatar.body.applyImpulse( cc.p(0,Player.JFORCE), cc.p(0,0) );
    },

    processMove: function( dt ) {
        var speed = this._forwardSpeed - this._backwardSpeed;
        var p = this.getPos();
        var speedX = speed;
        var speedY = 0;
        if( this.state == Player.STATE.FLOOR ) {
            var xLen = this.curFloor.cfg.width;
            var yLen = this.curFloor.cfg.slope;
            speedX = speed;
            speedY = speed * yLen / xLen;
        }
        var x = p.x + speedX * dt;
//        var y = p.y + ( this._ySpeed + speedY ) * dt;
        var y = p.y + speedY * dt;
        this.setPos( cc.p(x, y) );
    },

    _updatePlatformPos: function() {
//        var p = this.platform.getPosition();
//        this.platform.setPosition( p.x-this.offset.x, p.y+this.offset.y );
        this.layer.space.staticBody.setPos(this.offset);
    },

    processGravity: function( dt ) {
        if( this.state == Player.STATE.FLOOR ) {
            this._ySpeed = 0;
            return;
        }
        this._ySpeed -= this.gravity * dt;
    },

    getPos: function() {
        return this.mainAvatar.body.getPos();
    },

    setPos: function( pos ) {
        this.mainAvatar.body.setPos(pos);
    },

    update: function( dt ) {
        this.processMove( dt );
//        this.processFakeCamera(dt);
        this.processGravity( dt );
    },

    onHitFloor: function( arbiter, space ) {
//        cc.log("hit");
        this.onFloorCount = 0;
        var curFloor;
        var shapes = arbiter.getShapes();
        if( shapes[0] == this.mainAvatar.shape ) {
            curFloor = this.floorMgr.getFloor( shapes[1] );
        } else {
            curFloor = this.floorMgr.getFloor( shapes[0] );
        }
        if( curFloor == this.curFloor && this.state == Player.STATE.FLOOR ) return;
        this.setState( Player.STATE.FLOOR );
        this.curFloor = curFloor;
        this._ySpeed = 0;
        this.mainAvatar.body.vx = 0;
        this.mainAvatar.body.v_biasx = 0;
        this.mainAvatar.body.setAngle(this.curFloor.angle);
        return true;
    },

    whenOnFloor: function( arbiter, space ) {
        this.onFloorCount++;
        this.mainAvatar.body.vx = 0;
        this.mainAvatar.body.v_biasx = 0;
        if(this.onFloorCount>10) {
            this.mainAvatar.body.vy = 0;
            this.mainAvatar.body.v_biasy = 0;
        }
    },

    onLeaveFloor: function( arbiter, space ) {
//        cc.log("leave");
        var x = this.getPos().x;
        var shapes = arbiter.getShapes();
        var floor = shapes[0] == this.mainAvatar.shape ? shapes[1] : shapes[0];
        floor = this.floorMgr.getFloor( floor );
        var c = floor.cfg;
        if( this.moveState != Player.MOVE.STOP && x > c.x && x < c.x+c.width ) return;
        if( this.curFloor == floor ) {
            this.setState( Player.STATE.FLY );
        }
    }
})

Player.POS = { x:300, y:450 };
Player.JFORCE = 800;
Player.SPEED = 400;
Player.MOVE = {
    FORWARD: 1, BACKWARD: 2, STOP: 3
};
Player.STATE = {
    FLOOR: 1, FLY: 2
};
Player.MAX_X = 0.6;
Player.MIN_X = 0.2;
Player.MAX_Y = 0.6;
Player.MIN_Y = 0.2;
