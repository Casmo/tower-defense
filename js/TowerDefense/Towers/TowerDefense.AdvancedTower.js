TowerDefense.AdvancedTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Advanced Tower';
    this.description = '<p>Advanced tower. Awesome.</p>';
    this.costs = 1;
    this.speed = 1;
    this.range = 1;
    this.meshObject = 'tower-02';
    this.meshTexture = 'tower-02';
    this.icon = 'default.png';
    this.material = new THREE.MeshLambertMaterial( { color: 0xcccccc } );
    this.materialEmissive = '0xfffde8';

}

TowerDefense.AdvancedTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.AdvancedTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;

    return this.object;

}