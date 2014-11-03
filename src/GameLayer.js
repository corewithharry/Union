/**
 * Created by yanzhan1 on 10/7/2014.
 */

var GameLayer = cc.LayerColor.extend({
    scene: null,
    player: null,
    space: null,
    floorMgr: null,

    ctor: function( scene ) {
        this._super();
        this.scene = scene;
        this._initPhysics();
        this.setColor( Cfg.COLOR.LAYER );
        this.floorMgr = new FloorMgr( this, GameLayer.Z.FLOOR );
        this._initPlayer();
        this._registerInputs();
        this.scheduleUpdate();
    },

    _initPhysics: function() {
        var space = new cp.Space();
        space.iterations = 60;
        space.gravity = cp.v(0, -Cfg.PHYSICS_GRAVITY);
        space.sleepTimeThreshold = 0.5;
        //space.collisionSlop = 0;
        space.sleepTimeThreshold = 0.5;
        this.space = space;
        this.debugNode = cc.PhysicsDebugNode.create( this.space );
        this.debugNode.visible = true ;
        this.addChild( this.debugNode );
    },

    _initPlayer: function() {
        var p = new Player( this );
        this.addChild( p, GameLayer.Z.PLAYER );
        this.player = p;
        var square = new Square( this );
        p.addShape( square );
        p.scheduleUpdate();
    },

    update : function(dt) {
        this.space.step(dt);
    },

    _registerInputs: function() {
        var self = this;
        // keyboard
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(key,event){self.onKeyPressed(key,event);},
            onKeyReleased: function (key,event){self.onKeyReleased(key,event);}
        }, this);
    },

    onKeyPressed: function( key, event ) {
        if( key == cc.KEY.a || key == cc.KEY.left ) {
            this.player.moveBackward( true );
        } else if( key == cc.KEY.d || key == cc.KEY.right ) {
            this.player.moveFoward( true );
        } else if( key == cc.KEY.space ) {
            this.player.jump();
        }
    },

    onKeyReleased: function( key, event ) {
        if( key == cc.KEY.a || key == cc.KEY.left ) {
            this.player.moveBackward( false );
        } else if( key == cc.KEY.d || key == cc.KEY.right ) {
            this.player.moveFoward( false );
        }
    }
})

GameLayer.Z = {
    FLOOR: 1, PLAYER: 9
}

