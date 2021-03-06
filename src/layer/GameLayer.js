/**
 * Created by yanzhan1 on 10/7/2014.
 */

var GameLayer = cc.Layer.extend({
    scene: null,
    player: null,
    space: null,
    floorMgr: null,
    cameraCtrl: null,
    btnMgr: null,
    platform: null,

    ctor: function( scene ) {
        this._super();
        this.scene = scene;
        this._registerInputs();
//        this._initButtons();
        this._initPhysics();
        this._initPlayer();
        this.cameraCtrl = new CameraCtrl( this );
        this._initPlatform();
        this.scheduleUpdate();
    },

    _initPlatform: function() {
        this.platform = new PlatformLayer(this);
        this.addChild( this.platform, GameLayer.Z.PLATFORM );
        this.floorMgr = new FloorMgr( this.platform );
        this.player.setPlatformLayer(this.platform);
        this.player.setFloorMgr( this.floorMgr );
    },

    _initPhysics: function() {
        var space = new cp.Space();
        space.iterations = 60;
        space.gravity = cp.v(0, -Cfg.PHYSICS_GRAVITY);
        space.sleepTimeThreshold = 0.1;
        this.space = space;
        this.debugNode = cc.PhysicsDebugNode.create( this.space );
        this.debugNode.visible = true ;
        this.addChild( this.debugNode );
    },

    _initButtons: function() {
        this.btnMgr = new ButtonMgr();
        this.addChild( this.btnMgr, GameLayer.Z.UI );
        // left move
        var param = {
            scale: { x: 1.6, y: 2.0 },
            pos: { x: 0.10, y: 0.12 },
            img1: res.MoveBtn_png,
            pressCallBack: this.onPressLeft.bind(this),
            releaseCallBack: this.onReleaseLeft.bind(this)
        }
        var btn = new MyButton( param );
        this.btnMgr.addButton( btn );
        // right move
        var param = {
            scale: { x: 1.6, y: 2.0 },
            pos: { x: 0.26, y: 0.12 },
            img1: res.MoveBtn_png,
            pressCallBack: this.onPressRight.bind(this),
            releaseCallBack: this.onReleaseRight.bind(this)
        }
        var btn = new MyButton( param );
        btn.rotation = 180;
        this.btnMgr.addButton( btn );
        // jump
        var param = {
            scale: { x: 2.0, y: 2.0 },
            pos: { x: 0.90, y: 0.12 },
            img1: res.JumpBtn_png,
            pressCallBack: this.onPressJump.bind(this)
        }
        var btn = new MyButton( param );
        this.btnMgr.addButton( btn );
    },

    _initPlayer: function() {
        var p = new Player( this );
        this.addChild( p, GameLayer.Z.PLAYER );
        this.player = p;
//        var avatar = new Square( this );
//        var avatar = new Triangle(this);
        var avatar = new Circle(this);
        p.addAvatar( avatar );
        p.scheduleUpdate();
    },

    update : function(dt) {
        this.space.step(dt);
        this.cameraCtrl.update(dt);
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

    onPressLeft: function() {
        this.player.moveBackward( true );
    },
    onReleaseLeft: function() {
        this.player.moveBackward( false );
    },
    onPressRight: function() {
        this.player.moveFoward( true );
    },
    onReleaseRight: function() {
        this.player.moveFoward( false );
    },
    onPressJump: function() {
        this.player.jump();
    },

    onKeyPressed: function( key, event ) {
        if( key == cc.KEY.a || key == cc.KEY.left ) {
            this.onPressLeft();
        } else if( key == cc.KEY.d || key == cc.KEY.right ) {
            this.onPressRight();
        } else if( key == cc.KEY.space ) {
            this.onPressJump();
        } else if( key == cc.KEY.z ) {
            this.player.gravity = this.player.gravity == 0 ? Cfg.GRAVITY : 0;
        }
    },

    onKeyReleased: function( key, event ) {
        if( key == cc.KEY.a || key == cc.KEY.left ) {
            this.onReleaseLeft();
        } else if( key == cc.KEY.d || key == cc.KEY.right ) {
            this.onReleaseRight();
        }
    }
})

GameLayer.Z = {
    BACK: 0, PLATFORM: 100, PLAYER: 200, UI: 900
}

