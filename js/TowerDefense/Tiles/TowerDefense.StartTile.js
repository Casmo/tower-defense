/**
 * Tile for spawning enemies. Only one could exist per level.
 * @constructor
 */
TowerDefense.StartTile = function () {

    TowerDefense.Tile.call( this );
    this.material = new THREE.MeshBasicMaterial( { color: 0x1eff00 } );

}

TowerDefense.StartTile.prototype = Object.create( TowerDefense.Tile.prototype );

TowerDefense.StartTile.prototype.select = function() {
    TowerDefense.Ui.hideBuildMenu();
    return false;
}