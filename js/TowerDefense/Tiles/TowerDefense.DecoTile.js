/**
 * Tile for decoration the underground
 * @constructor
 */
TowerDefense.DecoTile = function () {

    TowerDefense.Tile.call( this );
    this.meshTexture = 'level-01';
    this.geometry = new THREE.BoxGeometry( 100, 100, 1);
    this.position = { x: 0, y: 0, z: -.6 };
    this.selectable = false;

}

TowerDefense.DecoTile.prototype = Object.create( TowerDefense.Tile.prototype );

TowerDefense.DecoTile.prototype.select = function() {
    return false;
}