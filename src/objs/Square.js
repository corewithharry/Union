/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Square = Shape.extend({
    ctor: function( layer ) {
        this._super( layer );
        this.drawNode.drawRect( cc.p(0,0), cc.p(Square.LENGTH,Square.LENGTH), Cfg.COLOR.SQUARE, 0, Cfg.COLOR.SQUARE );
    }
})

Square.LENGTH = 100;