/**
 * Created by Rock on 10/7/14.
 */

var PhysicsMgr = cc.Class.extend({
    layer: null,
    space: null,

    ctor: function (layer) {
        this.layer = layer;
        this._initSpace();
    },

    _initSpace: function() {
        var space = new cp.Space();
        space.iterations = 60;
        space.gravity = cp.v(0, -500);
        space.sleepTimeThreshold = 0.5;
        space.collisionSlop = 0.5;
        space.sleepTimeThreshold = 0.5;
        this.space = space;
    },

    addObj: function( obj ) {
        var space = this.space;
        space.addBody( obj.body );
        space.addShape( obj.shape );
    }
})