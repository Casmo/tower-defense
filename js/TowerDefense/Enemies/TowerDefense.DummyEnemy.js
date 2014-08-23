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

}

TowerDefense.DummyEnemy.prototype = Object.create( TowerDefense.Enemy.prototype );

TowerDefense.DummyEnemy.prototype.create = function() {

    var sphere = new THREE.SphereGeometry( 0.1, 16, 8 );
    this.object = new THREE.SpotLight( 0xffffff );

    this.object.target = TowerDefense.endTile.object;

    this.object.castShadow = true;

    this.object.shadowMapWidth = 1024;
    this.object.shadowMapHeight = 1024;
    this.object.shadowCameraNear = .1;
    this.object.shadowCameraFar = 100;
    this.object.shadowCameraFov = 200;

    this.object.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
    this.object.position.x = this.position.x;
    this.object.position.y = this.position.y;
    this.object.position.z = .15;//this.position.z;
    this.add();
    return this.object;

};

TowerDefense.DummyEnemy.prototype.endPath = function() {
    this.reset();
    this.setPath();
}