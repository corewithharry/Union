/**
 * Created by Rock on 9/21/14.
 */

var MyButton = cc.Node.extend({
    img1: null,
    img2: null,
    myHeight: 0,
    myWidth: 0,
    oriScale: {x:1,y:1},
    pressCallBack: null,
    releaseCallBack: null,
    isDisable: false,

    ctor: function( param ) {
        this._super();
        var p = param || {};
        var scale = p.scale ? p.scale : { x:1, y:1 }
        var scaleX = scale.x;
        var scaleY = scale.y;
        var img = new cc.Sprite( param.img1 );
        img.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: 0
        });
        this.oriScale = {x:scaleX, y:scaleY};
        img.setScaleX( scaleX );
        img.setScaleY( scaleY );
        this.img1 = img;
        this.addChild( img, MyButton.Z.IMG1 );
        img = new cc.Sprite( param.img2||param.img1 );
        img.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,
            y: 0
        });
        img.setScale( scaleX, scaleY );
//        img.setScaleX( scaleX );
//        img.setScaleY( scaleY );
        this.img2 = img;
        this.addChild( img, MyButton.Z.IMG2 );
        this.myHeight = MyButton.HEIGHT * scaleY;
        this.myWidth = MyButton.WIDTH * scaleX;
        this.img2.setVisible( false );
        var pos = p.pos || {x:0,y:0};
        this.x = g_size.width * pos.x;
        this.y = g_size.height * pos.y;
        this.pressCallBack = param.pressCallBack;
        this.releaseCallBack = param.releaseCallBack;
    },

    setDisable: function( val ) {
        this.isDisable = val;
    },

    _getScale: function( str ) {
        var scale = ( str.length - 2 ) * 0.5;
        scale = scale < 0 ? 0 : scale;
        return scale + 1;
    },

    onTouchBegan: function( touch ) {
        if( this.isDisable ) return;
//        this.img2.setVisible( true );
        this.img1.setScale( this.oriScale.x*1.1, this.oriScale.y*1.1 );
        if( !this.pressCallBack ) return;
        this.pressCallBack();
    },

    onTouchEnded: function( touch, isOut ) {
        if( this.isDisable ) return;
//        this.img2.setVisible( false );
        this.img1.setScale( this.oriScale.x, this.oriScale.y );
        // call back
//        if( isOut ) return;
        if( !this.releaseCallBack ) return;
        this.releaseCallBack();
    }
});

MyButton.Z = {
    IMG1: 1, IMG2: 2
};

MyButton.WIDTH = 185;
MyButton.HEIGHT = 72;