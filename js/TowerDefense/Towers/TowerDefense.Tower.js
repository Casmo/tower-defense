TowerDefense.Tower = function () {

    TowerDefense.Element.call( this );
    this.position = { x: 0, y: 0, z: 1 };
    this.material = new THREE.MeshLambertMaterial( { color: 0x368218 } );
    this.geometry = new THREE.BoxGeometry( .85, .85, 2 );

    /**
     * Whether an enemy can or cannot walk through it.
     * @type {boolean}
     */
    this.collisionable = true;

}
// @todo create prototype
TowerDefense.Tower.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Tower.prototype.constructor = TowerDefense.Tower;

/**
 * Creates a tower and add it to the selected tile object.
 * @param tileObject
 * @returns Three.js mesh
 */
TowerDefense.Tower.prototype.create = function(tileObject) {

    if (tileObject == null) {
        return console.log('Cannot build tower on the selected tile.');
    }
    if (tileObject.currentTower.id != null) {
        return console.log('Already tower on this tile.');
    }
    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.receiveShadow = true;
    this.object.castShadow = true;
    this.object.position.z = this.position.z;

    if (this.collisionable == true) {
        TowerDefense.grid[tileObject.gridPosition.x][tileObject.gridPosition.y].open = false;
    }
    tileObject.object.add(this.object);
    this.add();
    tileObject.currentTower = this;

    return this.object;

};