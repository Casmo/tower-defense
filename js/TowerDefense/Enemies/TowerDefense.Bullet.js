TowerDefense.Bullet = function () {

    TowerDefense.Element.call( this );

    this.type = 'BULLET';

    this.stats = {
        damage: 1,
        speed: .01 // Movement in units.
    }

    this.lastMovement = {};
    this.deadTimer = 180;

    this.targetIndex = -1;
    this.material = new THREE.MeshBasicMaterial( { color: 0xff9900 } );
    this.geometry = new THREE.BoxGeometry( .5, .5, .5 );
}

TowerDefense.Bullet.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Bullet.prototype.constructor = TowerDefense.Bullet;

TowerDefense.Bullet.prototype.remove = function () {

    TowerDefense.__removeObject(this);

}

TowerDefense.Bullet.prototype.update = function() {

    // Move closer to targetIndex position or delete when it hits or is already destroyed
    if (TowerDefense.objects[this.targetIndex] == null) {

        this.object.position.x -= this.lastMovement.x;
        this.object.position.y -= this.lastMovement.y;
        this.object.position.z -= this.lastMovement.z;
        this.deadTimer--;
        if (this.deadTimer <= 0) {
            this.remove();
        }
        return;
    }
    var target = TowerDefense.objects[this.targetIndex];

    if (TowerDefense.inRange(target.object.position, this.object.position,1)) {
        TowerDefense.objects[this.targetIndex].removeHealth(this.stats.damage);
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

    this.lastMovement = { x: moveX, y: moveY, z: moveZ };

    this.object.position.x -= moveX;
    this.object.position.y -= moveY;
    this.object.position.z -= moveZ;

}