TowerDefense.BasicTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Basic Tower';
    this.description = '<p>Most basic tower in game. Still awesome.</p>';
    this.costs = 1;
    this.speed = 1;
    this.range = 1;

}

TowerDefense.BasicTower.prototype = Object.create( TowerDefense.Tower.prototype );