/**
 * The dummy enemy is nothing more than a moving light that indicated the "move path" of
 * a normal enemy.
 * @todo we need to 'reset' this dummy at the start everytime a tower is build.
 * @constructor
 */
TowerDefense.DummyEnemy = function () {

    TowerDefense.Enemy.call( this );
    this.type = 'DUMMY-ENEMY'
    this.isDummy = true;
    this.stats.speed = .1;
    this.geometry = new THREE.SphereGeometry(.5, 16, 8 );

}

TowerDefense.DummyEnemy.prototype = Object.create( TowerDefense.Enemy.prototype );

TowerDefense.DummyEnemy.prototype.endPath = function() {
    this.reset();
    this.setPath();
}