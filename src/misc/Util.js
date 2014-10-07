/**
 * Created by yanzhan1 on 10/7/2014.
 */

var Util = new Object();

Util.getOppositeDir = function( dir ) {
    var newDir;
    switch ( dir ) {
        case Def.UP:
            newDir = Def.DOWN;
            break;
        case Def.DOWN:
            newDir = Def.UP;
            break;
        case Def.LEFT:
            newDir = Def.RIGHT;
            break;
        case Def.RIGHT:
            newDir = Def.LEFT;
            break;
    }
    return newDir;
};

Util.isOppositeDir = function( oriDir, newDir ) {
    return Util.getOppositeDir(oriDir) == newDir;
}