/**
 * Tile for spawning enemies. Only one could exist per level.
 * @constructor
 */
TowerDefense.EndTile = function () {

    TowerDefense.Tile.call( this );
    this.material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );

}

TowerDefense.EndTile.prototype = Object.create( TowerDefense.Tile.prototype );

TowerDefense.EndTile.prototype.select = function() {
    TowerDefense.Ui.hideBuildMenu();
    return false;
}