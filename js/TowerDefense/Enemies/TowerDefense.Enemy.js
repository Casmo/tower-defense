TowerDefense.Enemy = function () {

    TowerDefense.Element.call( this );

    this.type = 'ENEMY';

    /**
     * Current 3D position in the world
     * @type {{x: number, y: number, z: number}}
     */
    this.position = { x: 0, y: 0, z: 1 };

    /**
     * Array with 3D points to move along
     * @type {Array}
     */
    this.path = [];

    /**
     * The x, y grid position of the enemy
     * @type {object}
     */
    this.gridPosition = { x: -1, y: -1 };

    /**
     * The number of 3D units to move each update()
     * @type {number}
     */
    this.speed = .5; // number of seconds per tile
    this.material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    this.geometry = new THREE.BoxGeometry( .85, .85, 2 );

}

TowerDefense.Enemy.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Enemy.prototype.constructor = TowerDefense.Enemy;

TowerDefense.Enemy.prototype.reset = function() {

    this.gridPosition = { x: -1, y: -1 };
    this.object.position.x = TowerDefense.startTile.object.position.x;
    this.object.position.y = TowerDefense.startTile.object.position.y;
    this.tween = {};

}

TowerDefense.Enemy.prototype.create = function() {

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.receiveShadow = true;
    this.object.castShadow = true;

    this.object.position.x = TowerDefense.startTile.object.position.x;
    this.object.position.y = TowerDefense.startTile.object.position.y;
    this.object.position.z = this.position.z;
    this.add();
    return this.object;

};

/**
 * Fill the movePath with all positions of tiles to walk through. The enemy then
 * will follow this path with tweening (bezier curves) in the update() function.
 */
TowerDefense.Enemy.prototype.setPath = function () {

    this.removeTween();
    // Set the path from the current position (x, y) to the end position (x,y)
    if (this.gridPosition.x == -1) {
        this.gridPosition.x = TowerDefense.startTile.gridPosition.x;
    }
    if (this.gridPosition.y == -1) {
        this.gridPosition.y = TowerDefense.startTile.gridPosition.y;
    }

    var start = TowerDefense.nodes[this.gridPosition.x][this.gridPosition.y];
    var end = TowerDefense.nodes[TowerDefense.endTile.gridPosition.x][TowerDefense.endTile.gridPosition.y];
    var result = TowerDefense.astar.search(TowerDefense.nodes, start, end);

    if (result == '') {;
        console.log('Enemy path cannot be calculated.');
        return false;
    }

    // Add the results into a tween
    this.path = [];
    var position = { x: this.object.position.x, y: this.object.position.y };
    // Get the 3D position of the current result
    position.gridPosition = { x: start.x, y: start.y };
    this.path.push(position);
    for (i = 0; i < result.length; i++) {
        position = { x: 0, y: 0 };
        // Get the 3D position of the current result
        position.x = TowerDefense.grid[result[i].x][result[i].y].object.position.x;
        position.y = TowerDefense.grid[result[i].x][result[i].y].object.position.y;
        position.gridPosition = { x: result[i].x, y: result[i].y };
        this.path.push(position);
    }
    var duration = (this.path.length + 1) * this.speed;
    duration *= 1000;
    var dummy = { p: 0, object: this };
    var spline = new TowerDefense.Spline();
//    var self = this;
    this.tween = new TWEEN.Tween( dummy )
      .to( { p: 1 },
      duration ).easing( TWEEN.Easing.Linear.None ).onUpdate( function() {
          var position = spline.get2DPoint( this.object.path, this.p );
          this.object.gridPosition = position.gridPosition;
          this.object.object.position.x = position.x;
          this.object.object.position.y = position.y;
      })
      .onComplete( function () {
          this.object.endPath();
      } )
      .start();
}

TowerDefense.Enemy.prototype.update = function() {


}

/**
 * Callback after the end of movement.
 * @todo Remove a life or something.
 */
TowerDefense.Enemy.prototype.endPath = function() {

    // Fix that only the current enemy will deletes it's tween.
    this.removeTween();
    scene.remove(this.object);

}

TowerDefense.Enemy.prototype.removeTween = function() {

    TWEEN.remove(this.tween);


}