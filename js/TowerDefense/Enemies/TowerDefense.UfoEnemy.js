TowerDefense.UfoEnemy = function () {

    TowerDefense.Enemy.call( this );

    this.meshTexture = 'ufo-yellow';
    this.meshObject = 'ufo';

    this.stats = {
        hp: 4,
        resources: 3,
        score: 300,
        speed: .025
    };

    this.timer = Date.now();

}

TowerDefense.UfoEnemy.prototype = Object.create( TowerDefense.Enemy.prototype );

TowerDefense.UfoEnemy.prototype.create = function () {

    TowerDefense.Enemy.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;
    this.object.position.z = 3;

    return this.object;

}

TowerDefense.UfoEnemy.prototype.update = function () {

    TowerDefense.Enemy.prototype.update.call(this);

    var activeTimer = this.timer * 0.01525;
    this.timer += 2; // Speed of up and down
    this.object.position.z = 2 + Math.sin(activeTimer) * .5; // the distance of up and down
    this.object.rotation.y += .015;

}