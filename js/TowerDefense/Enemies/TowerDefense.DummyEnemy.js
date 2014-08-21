/**
 * The dummy enemy is nothing more than a moving light that indicated the "move path" of
 * a normal enemy.
 * @todo we need to 'reset' this dummy at the start everytime a tower is build.
 * @constructor
 */
TowerDefense.DummyEnemy = function () {

    TowerDefense.Enemy.call( this );
    this.speed = .01;

}

TowerDefense.DummyEnemy.prototype = Object.create( TowerDefense.Enemy.prototype );

TowerDefense.DummyEnemy.prototype.create = function() {

    var sphere = new THREE.SphereGeometry( 0.1, 16, 8 );
    this.object = new THREE.PointLight( 0xff0040, 2, 50 );
    this.object.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
    this.object.position.x = this.position.x;
    this.object.position.y = this.position.y;
    this.object.position.z = .5;//this.position.z;
    this.object.castShadow = true;
    this.add();
    return this.object;

};

TowerDefense.DummyEnemy.prototype.endPath = function() {
    this.reset();
    this.setPath();
}