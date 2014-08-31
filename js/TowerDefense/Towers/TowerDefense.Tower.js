TowerDefense.Tower = function () {

    TowerDefense.Element.call( this );

    this.name = ''; // Name of the tower
    this.description = ''; // Description of the tower. May contain HTML
    this.costs = 1; // Price to build
    this.speed = 1; // Speed per bullet interval
    this.range = 1; // Range in units
    this.icon = 'default.png'; // Tower icon

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
 * @return the created mesh
 */
TowerDefense.Tower.prototype.create = function() {

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.receiveShadow = true;
    this.object.castShadow = true;
    this.object.position.z = this.position.z;
    return this.object;

};

/**
 * Spawns the tower to the selected tileObject
 * enemies. Traps for example will not close the current grid position.
 * @param tileObject
 * @returns boolean
 */
TowerDefense.Tower.prototype.spawn = function(tileObject) {

    if (tileObject == null) {
        console.log('Cannot build tower on the selected tile.');
        return false;
    }
    if (tileObject.currentTower.id != null) {
        console.log('Already tower on this tile.');
        return false;
    }

    // @todo implement this
    if (false && this.collisionable == true) {
        // First check if it is allowed...
        var testGrid = TowerDefense.grid;
        testGrid[tileObject.gridPosition.x][tileObject.gridPosition.y].open = false;
        //if (result == '') {
        //  return false;
        // }
        TowerDefense.grid[tileObject.gridPosition.x][tileObject.gridPosition.y].open = false;
        TowerDefense.gridPath[tileObject.gridPosition.x][tileObject.gridPosition.y] = false;
    }

    if (this.collisionable == true) {
        TowerDefense.grid[tileObject.gridPosition.x][tileObject.gridPosition.y].open = false;
        TowerDefense.gridPath[tileObject.gridPosition.x][tileObject.gridPosition.y] = false;
    }
    tileObject.object.add(this.object);
    tileObject.currentTower = this;
    return true;

}