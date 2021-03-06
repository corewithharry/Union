/**
 * Created by Rock on 10/31/14.
 */

var FloorMgr = cc.Class.extend({
    layer: null,
    space: null,
    floors: [],
    shape2floor: {},

    ctor: function ( layer ) {
        this.layer = layer;
        this.space = layer.space;
        this._createFloors();
        var player = this.layer.player;
        this.space.addCollisionHandler( Cfg.TAGS.FLOOR, Cfg.TAGS.PLAYER,
            player.onHitFloor.bind(player),
            null,
            player.whenOnFloor.bind(player),
            player.onLeaveFloor.bind(player));
    },

    _createFloors: function() {
        this.floors = new Array( FloorMgr.CFG.length );
        for( var i in FloorMgr.CFG ) {
            var floor = new Floor( this, FloorMgr.CFG[i] );
            this.floors.push( floor );
            this.layer.addChild( floor, 0 );
            floor.shape.setCollisionType( Cfg.TAGS.FLOOR );
            this.shape2floor[floor.shape.hashid] = floor;
        }
    },

    getFloor: function( shape ) {
        return this.shape2floor[shape.hashid];
    }
})

FloorMgr.CFG = [
    { x: 500, y: 480, width: 150, height: 1, slope: 0 },
    { x: 800, y: 580, width: 600, height: 1, slope: 0 },
    { x: 800, y: 700, width: 600, height: 1, slope: 0 },
    { x: 100, y: 300, width: 8000, height: 1, slope: 0 }
]