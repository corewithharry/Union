/**
 * Created by yanzhan1 on 10/7/2014.
 */

var GameLayer = cc.LayerColor.extend({
    scene: null,
    player: null,
    ctor: function( scene ) {
        this._super();
        this.scene = scene;
        this.setColor( Cfg.COLOR.LAYER );
        this._initPlayer();
        this._registerInputs();
    },

    _initPlayer: function() {
        var p = new Player( this );
        this.addChild( p, GameLayer.Z.PLAYER );
        this.player = p;
        var square = new Square();
        p.addShape( square );
        p.setPosition( cc.p(100,100) );
        p.scheduleUpdate();
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

