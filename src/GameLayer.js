/**
 * Created by yanzhan1 on 10/7/2014.
 */

var GameLayer = cc.LayerColor.extend({
    scene: null,
    ctor: function( scene ) {
        this._super();
        this.scene = scene;
        this.setColor( Cfg.COLOR.LAYER );
        this._registerInputs();
        var node = new cc.DrawNode();
        this.addChild( node, 0 );
        node.clear();
        node.drawRect( cc.p(100,100), cc.p(200,200), Cfg.COLOR.SQUARE, 0, Cfg.COLOR.SQUARE );
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
        var dir;
        if( key == cc.KEY.a || key == cc.KEY.left ) {
            dir = Def.LEFT;
        } else if( key == cc.KEY.d || key == cc.KEY.right ) {
            dir = Def.RIGHT;
        }
        if( this.state == GameLayer.STATE.GAME || this.state == GameLayer.STATE.PAUSE ) {
            this.thief.changeDir( dir );
            this.dirArrow.showArrows( dir );
        } else if ( this.state == GameLayer.STATE.PREPARE ) {
            this.thief.changeDir( dir );
            this.dirArrow.showArrows( dir );
            this._stupidGuards();
            this.runGame();
        }
    },

    onKeyReleased: function( key, event ) {

    }
})

