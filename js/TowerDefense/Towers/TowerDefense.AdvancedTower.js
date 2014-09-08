TowerDefense.AdvancedTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Advanced Tower';
    this.description = '<p>Advanced tower. Awesome.</p>';
    this.meshObject = 'tower-02';
    this.meshTexture = 'tower-02';
    this.stats = {
        costs: 9,
        speed: 1000,
        range: 25
    }
    this.icon = 'tower-02.png';
    this.material = new THREE.MeshLambertMaterial( { color: 0xcccccc } );
    this.materialEmissive = '0xfffde8';

}

TowerDefense.AdvancedTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.AdvancedTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;

    return this.object;

}