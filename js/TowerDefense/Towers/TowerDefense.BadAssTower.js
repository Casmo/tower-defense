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
    this.rotation = {x: Math.PI / 2, y: 0, z: 0 };
    this.position = { x: 0, y: 0, z: 0 };

}

TowerDefense.BadAssTower.prototype = Object.create( TowerDefense.Tower.prototype );