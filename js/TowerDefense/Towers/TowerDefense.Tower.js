TowerDefense.Tower = function () {

    TowerDefense.Element.call( this );

    this.name = ''; // Name of the tower
    this.description = ''; // Description of the tower. May contain HTML
    this.stats = {
        costs: 1,
        speed: 4000, // Interval in ms. @todo Might wanna do this in fps 'time'
        range: 20
    }
    this.icon = 'default.png'; // Tower icon

    this.material = new THREE.MeshLambertMaterial( { color: 0x368218 } );
    this.geometry = new THREE.BoxGeometry( .85, .85, 2 );
    /**
     * Whether an enemy can or cannot walk through it.
     * @type {boolean}
     */
    this.collisionable = true;

    /**
     * Index of the TowerDefense.objects that this tower is shooting at.
     * @type {number}
     */
    this.shootingTargetIndex = -1;
    this.lastShot = Date.now();
    this.bullet = function () { return new TowerDefense.Bullet(); };
    this.bulletOffset = { x: 0, y: 0, z: 0 };

}
// @todo create prototype
TowerDefense.Tower.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Tower.prototype.constructor = TowerDefense.Tower;

TowerDefense.Tower.prototype.create = function () {

    TowerDefense.Element.prototype.create.call(this);

}

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

    if (this.collisionable == true) {
        TowerDefense.grid[tileObject.gridPosition.x][tileObject.gridPosition.y].open = false;
        TowerDefense.gridPath[tileObject.gridPosition.x][tileObject.gridPosition.y] = false;
    }
    tileObject.object.add(this.object);
    tileObject.currentTower = this;
    return true;

}

TowerDefense.Tower.prototype.update = function () {

    // @todo remove time and use counter
    if (this.object.parent != null && (this.lastShot + this.stats.speed < TowerDefense.time)) {
        this.shoot();
    }

}

TowerDefense.Tower.prototype.shoot = function () {

    this.lastShot = Date.now();
    // We need the position of the parent (the tile)
    if (TowerDefense.objects[this.shootingTargetIndex] == null ||
      !TowerDefense.inRange(TowerDefense.objects[this.shootingTargetIndex].object.position, this.object.parent.position, this.stats.range)) {
        // find target in range
        this.shootingTargetIndex = TowerDefense.findEnemyInRage(this.object.parent.position, this.stats.range);
    }

    if (TowerDefense.objects[this.shootingTargetIndex] != null) {
        var bullet = this.bullet();
        bullet.create();
        bullet.targetIndex = this.shootingTargetIndex;
        bullet.object.position.x = this.object.parent.position.x + this.bulletOffset.x;
        bullet.object.position.y = this.object.parent.position.y + this.bulletOffset.y;
        bullet.object.position.z = this.object.parent.position.z + this.bulletOffset.z;
        TowerDefense.scene.add(bullet.object);
        TowerDefense.__addObject(bullet);
    }

}