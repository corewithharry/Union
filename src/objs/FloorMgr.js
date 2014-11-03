/**
 * Created by Rock on 10/31/14.
 */

var FloorMgr = cc.Class.extend({
    layer: null,
    space: null,
    floors: [],
    zOrder: null,

    ctor: function ( layer, zOrder ) {
        this.layer = layer;
        this.space = layer.space;
        this.zOrder = zOrder;
        this._createFloors();
        var player = this.layer.player;
        this.space.addCollisionHandler( Cfg.TAGS.FLOOR, Cfg.TAGS.PLAYER,
            player.onHitFloor.bind(player));
    },

    _createFloors: function() {
        this.floors = new Array( FloorMgr.CFG.length );
        for( var i in FloorMgr.CFG ) {
            var floor = new Floor( this, FloorMgr.CFG[i] );
            this.floors.push( floor );
            this.layer.addChild( floor, this.zOrder );
            floor.shape.setCollisionType( Cfg.TAGS.FLOOR );
        }
    }
})

FloorMgr.CFG = [
    { x: 100, y: 500, width: 300, height: 10, slope: 0 },
    { x: 412, y: 498, width: 300, height: 10, slope: -100 },
    { x: 0, y: 600, width: 6000, height: 10, slope: 0 }
]