TowerDefense.Bullet = function () {

    TowerDefense.Element.call( this );

    this.type = 'BULLET';

    this.stats = {
        damage: 1,
        speed: .01 // Movement in units.
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

    if (TowerDefense.inRange(target.object.position, this.object.position,1)) {
        this.remove();
        return;
    }

    // Distance of each
    var moveXOrg = this.object.position.x - target.object.position.x;
    var moveYOrg = this.object.position.y - target.object.position.y;
    var moveZOrg = this.object.position.z - target.object.position.z;

    // Positive number of distance
    var moveX = Math.abs(moveXOrg);
    var moveY = Math.abs(moveYOrg);
    var moveZ = Math.abs(moveZOrg);

    // Total (100%)
    var total = moveX + moveY + moveZ;
    var one = 100 / total;

    var moveXPercent = one * moveX;
    var moveYPercent = one * moveY;
    var moveZPercent = one * moveZ;

    moveX = moveXPercent * this.stats.speed;
    moveY = moveYPercent * this.stats.speed;
    moveZ = moveZPercent * this.stats.speed;

    if (moveXOrg < 0) {
        moveX = moveX-moveX-moveX;
    }
    if (moveYOrg < 0) {
        moveY = moveY-moveY-moveY;
    }
    if (moveZOrg < 0) {
        moveZ = moveZ-moveZ-moveZ;
    }

    this.object.position.x -= moveX;
    this.object.position.y -= moveY;
    this.object.position.z -= moveZ;

//
//    var hundredPercent = moveX + moveY + moveZ;
//    var onePercent = hundredPercent / 100;
//    var moveXPercent = onePercent * moveX;
//    moveX = hundredPercent / moveXPercent * this.stats.speed;
////    moveX = this.stats.speed + (this.object.position.x - target.object.position.x);
//    moveY = this.stats.speed + (this.object.position.y - target.object.position.y);
//    moveZ = this.stats.speed + (this.object.position.z - target.object.position.z);
//    console.log(moveX);
//    this.object.position.x -= moveX;
//    this.object.position.y -= moveY;
//    this.object.position.z -= moveZ;
//    this.object.position.x = (one * moveX) + this.stats.speed;// * this.stats.speed;
//    this.object.position.y = (one * moveY) + this.stats.speed;; //* this.stats.speed;
//    this.object.position.z = (one * moveZ) + this.stats.speed;;// * this.stats.speed;

}