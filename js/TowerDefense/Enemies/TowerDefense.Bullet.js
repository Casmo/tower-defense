TowerDefense.Bullet = function () {

    TowerDefense.Element.call( this );

    this.type = 'BULLET';

    this.stats = {
        damage: 1,
        speed:.05 // Movement in units
    }

    this.targetIndex = -1;

    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    this.geometry = new THREE.BoxGeometry( .5, .5, .5 );
}

TowerDefense.Bullet.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Bullet.prototype.constructor = TowerDefense.Bullet;

TowerDefense.Bullet.prototype.remove = function () {

    if (TowerDefense.objects[this.targetIndex] != null) {
        TowerDefense.objects[this.targetIndex].removeHealth(this.stats.damage);
    }
    TowerDefense.__removeObject(this);

}

TowerDefense.Bullet.prototype.update = function() {

    // Move closer to targetIndex position or delete when it hits or is already destroyed
    if (TowerDefense.objects[this.targetIndex] == null) {
        this.remove();
        return;
    }
    var target = TowerDefense.objects[this.targetIndex];
    var moveX = (target.object.position.x + this.object.position.x) / 2;
    var moveY = (target.object.position.y + this.object.position.y) / 2;
    var moveZ = (target.object.position.z + this.object.position.z) / 2;
    this.object.position.x += moveX * this.stats.speed;
    this.object.position.y += moveY * this.stats.speed;
    this.object.position.z += moveZ * this.stats.speed;

}