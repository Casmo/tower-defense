TowerDefense.Enemy = function () {

    TowerDefense.Element.call( this );

    this.type = 'ENEMY';
    this.isDummy = false;

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

    this.stats = {
        hp: 2,
        resources: 1,
        score: 100,
        speed: 1
    };

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

/**
 * Fill the movePath with all positions of tiles to walk through. The enemy then
 * will follow this path with tweening (bezier curves) in the update() function.
 */
TowerDefense.Enemy.prototype.setPath = function () {

    this.removeTween();
    // Set the path from the current position (x, y) to the end position (x,y)
    if (typeof this.gridPosition == 'undefined') {
        console.log(this);
        this.gridPosition = { x: -1, y: -1 };
    }
    if (this.gridPosition.x == -1) {
        this.gridPosition.x = TowerDefense.startTile.gridPosition.x;
    }
    if (this.gridPosition.y == -1) {
        this.gridPosition.y = TowerDefense.startTile.gridPosition.y;
    }

    TowerDefense.FindPath.postMessage(
      {
          grid: TowerDefense.gridPath,
          start: {
              x: this.gridPosition.x,
              y: this.gridPosition.y
          },
          end: {
              x: TowerDefense.endTile.gridPosition.x,
              y: TowerDefense.endTile.gridPosition.y
          },
          returnAttributes: {
              moveObject: this.id
          }
      }
    );

}

TowerDefense.Enemy.prototype.move = function(result) {
    if (result == '') {
        console.log('Enemy path cannot be calculated.');
        return false;
    }

    this.path = [];

    var position = { x: this.object.position.x, y: this.object.position.y };
    // Get the 3D position of the current result
    this.path.push(position);
    for (var i = 0; i < result.length; i++) {
        position = { x: 0, y: 0 };
        // Get the 3D position of the current result
        position.x = TowerDefense.grid[result[i].x][result[i].y].object.position.x;
        position.y = TowerDefense.grid[result[i].x][result[i].y].object.position.y;
        position.gridPosition = { x: result[i].x, y: result[i].y };
        this.path.push(position);
    }
    var duration = (this.path.length + 1) * this.stats.speed;
    duration *= 1000;
    var dummy = { p: 0, object: this, objectId: this.id };
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
          TowerDefense.stats.lives--;
          this.object.remove();
      } )
      .start();
}

/**
 * Removing health from the current enemy. Removes the object and add stats if the enemy
 * is destroed.
 * @param health number of hitpoints to remove
 */
TowerDefense.Enemy.prototype.removeHealth = function(health) {

    this.stats.hp -= health;
    if (this.stats.hp <= 0) {
        TowerDefense.stats.score += this.stats.score;
        TowerDefense.stats.resources += this.stats.resources;
        if (typeof TowerDefense.objects[this.id].tween.stop == 'function') {
            TowerDefense.objects[this.id].tween.stop();
        }
        this.remove();
    }

}

TowerDefense.Enemy.prototype.update = function() {


}

/**
 * Callback after the end of movement.
 * @todo Remove a life or something.
 */
TowerDefense.Enemy.prototype.endPath = function() {

    console.log(this.id);
    // Fix that only the current enemy will deletes it's tween.
    //this.remove();

}