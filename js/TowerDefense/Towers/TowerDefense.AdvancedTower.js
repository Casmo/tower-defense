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
    this.rotation = {x: Math.PI / 2, y: 0, z: 0 };
    this.size = {x:.1, y:.1, z:.1};
    this.position = { x: 0, y: 0, z: .05 };

}

TowerDefense.AdvancedTower.prototype = Object.create( TowerDefense.Tower.prototype );