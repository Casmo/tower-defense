TowerDefense.BasicTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Basic Tower';
    this.description = '<p>Most basic tower in game. Still awesome.</p>';
    this.meshObject = 'tower-01';
    this.meshTexture = 'tower-01';
    this.icon = 'tower-01.png';
    this.stats = {
        costs: 1,
        speed: 2000,
        range: 20
    }
    this.material = new THREE.MeshLambertMaterial( { color: 0xcccccc } );
    this.materialEmissive = '0xcecece';
    this.bulletOffset = { x: 0, y: 0, z: 1.6 };

}

TowerDefense.BasicTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.BasicTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;

    return this.object;

}