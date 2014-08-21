TowerDefense.Enemy = function () {

    TowerDefense.Element.call( this );
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
    this.speed = 0.01;
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
TowerDefense.Enemy.prototype.setPath = function () {
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
        return console.log('Enemy path cannot be calculated.');
    }

    // Add the results into a tween
    this.path = [];
    for (i = 0; i < result.length; i++) {
        var position = { x: 0, y: 0, z: 0 };
        // Get the 3D position of the current result
        position.x = TowerDefense.grid[result[i].x][result[i].y].object.position.x;
        position.y = TowerDefense.grid[result[i].x][result[i].y].object.position.y;
        position.z = TowerDefense.grid[result[i].x][result[i].y].object.position.z;
        this.path.push(position);
    }

    var dummy = { p: 0 };
    var spline = new TowerDefense.Spline();
    var root = this;
    this.tween = new TWEEN.Tween( dummy )
      .to( { p: 1 },
      10000 ).easing( TWEEN.Easing.Linear.None ).onUpdate( function() {
          position = spline.get2DPoint( root.path, this.p );
          root.object.position.x = position.x;
          root.object.position.y = position.y;
          root.object.position.z = position.z;
      })
      .onComplete( function () {
          TWEEN.remove(root.tween);
      } )
      .start();
}

TowerDefense.Enemy.prototype.update = function() {


}