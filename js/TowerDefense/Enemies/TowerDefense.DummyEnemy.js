/**
 * The dummy enemy is nothing more than a moving light that indicated the "move path" of
 * a normal enemy.
 * @todo we need to 'reset' this dummy at the start everytime a tower is build.
 * @constructor
 */
TowerDefense.DummyEnemy = function () {

    this.isDummy = true;
    TowerDefense.Enemy.call( this );
    this.speed = .1;
    this.geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
    this.material = new THREE.MeshBasicMaterial( { color: 0xff0040 } );

}

TowerDefense.DummyEnemy.prototype = Object.create( TowerDefense.Enemy.prototype );


TowerDefense.DummyEnemy.prototype.endPath = function() {
    this.reset();
    this.setPath();
}