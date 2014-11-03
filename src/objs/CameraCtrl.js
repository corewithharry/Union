/**
 * Created by Rock on 11/2/14.
 */

var CameraCtrl = cc.Class.extend({
    layer: null,
    eye: {},
    camera: null,
    player: null,
    lastPos: {x:0,y:0},

    ctor: function (layer) {
        this.layer = layer;
        this.player = layer.player;
        this.camera = layer.getCamera();
        this.eye = this.camera.getEye();
        this.lastPos = this.player.getPos();
    },

    update: function( dt ) {
        var p = this.player.getPos();
        if( ( p.x - this.eye.x ) / g_size.width > CameraCtrl.MAX_X ) {
            // beyond left boundary
            this.eye.x = p.x - g_size.width * CameraCtrl.MAX_X;
            this._updateCameraPos();
        } else if( ( p.x - this.eye.x ) / g_size.width < CameraCtrl.MIN_X ) {
            // beyond right boundary
            this.eye.x = p.x - g_size.width * CameraCtrl.MIN_X;
            this.eye.x = this.eye.x < 0 ? 0 : this.eye.x;
            this._updateCameraPos();
        }
        if( ( p.y - this.eye.y ) / g_size.height > CameraCtrl.MAX_Y ) {
            // beyond up boundary
            this.eye.y = p.y - g_size.height * CameraCtrl.MAX_Y;
            this.eye.y = this.eye.y > 0 ? 0 : this.eye.y;
            this._updateCameraPos();
        } else if( ( p.y - this.eye.y ) / g_size.height < CameraCtrl.MIN_Y ) {
            // beyond bottom boundary
            this.eye.y = p.y - g_size.height * CameraCtrl.MIN_Y;
            this._updateCameraPos();
        }
    },

    _updateCameraPos: function() {
        this.camera.setEye( this.eye.x, this.eye.y, this.eye.z );
        this.camera.setCenter(this.eye.x, this.eye.y, 0);
    }
})

CameraCtrl.MAX_X = 0.6;
CameraCtrl.MIN_X = 0.2;
CameraCtrl.MAX_Y = 0.6;
CameraCtrl.MIN_Y = 0.2;