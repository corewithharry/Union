/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Square = Shape.extend({
    len: 0,

    ctor: function( layer ) {
        this._init();
        this._super( layer );
        this._initDrawNode();
    },

    _init: function() {
        this.len = Square.LENGTH;
    },

    _initBody: function() {
        var mass = 1;
        var body = new cp.Body(mass, cp.momentForBox(mass, this.len, this.len) );
        body.setPos( cc.p(0,0) );
        this.body = body;
        this.setBody( body );
    },

    _initShape: function() {
        var shape = new cp.BoxShape( this.body, this.len, this.len);
        shape.setElasticity( 0.5 );
        shape.setFriction( 0.5 );
        this.shape = shape;
    },

    _initDrawNode: function() {
        this.drawNode.drawRect( cc.p(0,0), cc.p(this.len,this.len), Cfg.COLOR.SQUARE, 0, Cfg.COLOR.SQUARE );
    }
})

Square.LENGTH = 100;