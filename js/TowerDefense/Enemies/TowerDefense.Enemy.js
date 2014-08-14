TowerDefense.Enemy = function () {

    TowerDefense.Element.call( this );
    this.position = { x: 0, y: 0, z: 1 };
    this.path = []; // List with positions how the enemy will be walking/flying.
    this.speed = 0.01; // The speed per update
    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    this.geometry = new THREE.BoxGeometry( .85, .85, 2 );

}

TowerDefense.Enemy.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Enemy.prototype.constructor = TowerDefense.Enemy;

TowerDefense.Enemy.prototype.create = function() {

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.position.x = this.position.x;
    this.object.position.y = this.position.y;
    this.object.position.z = this.position.z;
    this.add();
    return this.object;

};

/**
 * Fill the movePath with all positions of tiles to walk through. The enemy then
 * will follow this path with tweening (bezier curves) in the update() function.
 */
TowerDefense.Enemy.setPath = function () {
    // Set the path from the current position (x, y) to the end position (x,y)
}

TowerDefense.Enemy.prototype.update = function() {

    if (this.direction != null) {

    }

}