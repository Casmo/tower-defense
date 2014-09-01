TowerDefense.BasicTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Basic Tower';
    this.description = '<p>Most basic tower in game. Still awesome.</p>';
    this.costs = 1;
    this.speed = 1;
    this.range = 1;
    this.meshObject = 'tower-01';
    this.meshTexture = 'tower-01';
    this.rotation = {x: Math.PI / 2, y: 0, z: 0 };
    this.size = {x:.1, y:.1, z:.1};
    this.position = { x: 0, y: 0, z: .05 };

}

TowerDefense.BasicTower.prototype = Object.create( TowerDefense.Tower.prototype );