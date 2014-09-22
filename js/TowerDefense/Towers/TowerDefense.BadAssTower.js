TowerDefense.BadAssTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Badass Tower';
    this.description = '<p>Badass tower. Bad ass.</p>';
    this.meshObject = 'tower-03';
    this.meshTexture = 'tower-03';
    this.stats = {
        costs: 20,
        speed: 500,
        range: 30
    }
    this.icon = 'tower-03.png';
    this.material = new THREE.MeshLambertMaterial( { color: 0xcccccc } );
    this.materialEmissive = '0xcecece';
    this.bulletOffset = { x: 0, y: 0, z: 9.8 };
    this.bullet = function () { return new TowerDefense.RocketBullet(); };

}

TowerDefense.BadAssTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.BadAssTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;

    return this.object;

}