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

TowerDefense.Tower.prototype.create = function(tileObject) {

    if (tileObject == null) {
        return console.log('Cannot build tower on the selected tile.');
    }
    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.receiveShadow = true;
    this.object.castShadow = true;
    this.object.position.x = tileObject.object.position.x;
    this.object.position.y = tileObject.object.position.y;
    this.object.position.z = this.position.z;

    if (this.collisionable == true) {
        TowerDefense.grid[tileObject.gridPosition.x][tileObject.gridPosition.y].open = false;
    }

    this.add();

    return this.object;

};