TowerDefense.BasicEnemy = function () {

    TowerDefense.Enemy.call( this );

    this.meshTexture = 'ghost';
    this.meshObject = 'ghost';

    this.lastPosition = {
        x: 0,
        y: 0
    }
}

TowerDefense.BasicEnemy.prototype = Object.create( TowerDefense.Enemy.prototype );

TowerDefense.BasicEnemy.prototype.create = function () {

    TowerDefense.Enemy.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;

    return this.object;

}

TowerDefense.BasicEnemy.prototype.update = function () {

    TowerDefense.Enemy.prototype.update.call(this);

    this.object.position.z = 1;
    var p1 = {x: this.object.position.x, y: this.object.position.y}, p2 = {x: this.lastPosition.x, y: this.lastPosition.y};
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    this.object.rotation.y = angleRadians;
    this.lastPosition = {
        x: this.object.position.x,
        y: this.object.position.y
    }

}

TowerDefense.BasicEnemy.prototype.kill = function () {

    var blood = new TowerDefense.Blood();
    blood.create();
    blood.object.position.x = this.object.position.x + (Math.random() * 2) - 1;
    blood.object.position.y = this.object.position.y + (Math.random() * 2) - 1;
    blood.object.position.z = .1;
    TowerDefense.scene.add(blood.object);
    blood.add();
    TowerDefense.Enemy.prototype.kill.call(this);

}
