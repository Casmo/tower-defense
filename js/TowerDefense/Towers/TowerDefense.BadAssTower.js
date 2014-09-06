TowerDefense.BadAssTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Badass Tower';
    this.description = '<p>Badass tower. Bad ass.</p>';
    this.costs = 1;
    this.speed = 1;
    this.range = 1;
    this.meshObject = 'tower-03';
    this.meshTexture = 'tower-03';
    this.icon = 'default.png';
    this.material = new THREE.MeshLambertMaterial( { color: 0xcccccc } );
    this.materialEmissive = '0xcecece';

}

TowerDefense.BadAssTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.BadAssTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;

    return this.object;

}