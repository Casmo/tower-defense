TowerDefense.BasicTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Basic Tower';
    this.description = '<p>Most basic tower in game. Still awesome.</p>';
    this.meshObject = 'tower-01';
    this.meshTexture = 'tower-01';
    this.material = new THREE.MeshLambertMaterial( { color: 0xcccccc } );
    this.materialEmissive = '0xcecece';

}

TowerDefense.BasicTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.BasicTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;

    return this.object;

}