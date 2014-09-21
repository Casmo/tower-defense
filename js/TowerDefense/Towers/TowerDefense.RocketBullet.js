TowerDefense.RocketBullet = function () {

    TowerDefense.Bullet.call( this );

    this.type = 'BULLET';
    this.meshSprite = 'bullet-02';

    this.stats = {
        damage: 3,
        speed: .005 // Movement in units.
    }

    this.additionalSpeed = {
        x: 0,
        y: 0,
        z: 1.5
    }
    this.velocity = .8;

}

TowerDefense.RocketBullet.prototype = Object.create( TowerDefense.Bullet.prototype );

TowerDefense.RocketBullet.prototype.constructor = TowerDefense.RocketBullet;

/**
 * Update the bullet a little closer towards it target, with increasing speed
 * @return void
 */
TowerDefense.RocketBullet.prototype.update = function() {

    if (this.object.position.z < -1) {
        this.remove();
        return;
    }

    // Continue moving the bullet in a straight line after the target is destroyed from another object
    if (TowerDefense.objects[this.targetIndex] == null) {
        this.object.position.x -= this.lastMovement.x;
        this.object.position.y -= this.lastMovement.y;
        this.object.position.z -= this.lastMovement.z;
        this.deadTimer--;
        if (this.deadTimer < 100) {
            this.object.material.opacity = (this.deadTimer / 100);
        }
        if (this.deadTimer <= 0) {
            this.remove();
        }
        this.lastMovement.z += 0.01;
        return;
    }

    var target = TowerDefense.objects[this.targetIndex];
    this.speedTimer++;

    // Simple collision detection
    if (TowerDefense.inRange(target.object.position, this.object.position,1,false)) {
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

    // 1%
    var one = 100 / (moveX + moveY + moveZ);

    moveX = one * moveXOrg * this.stats.speed;
    moveY = one * moveYOrg * this.stats.speed;
    moveZ = one * moveZOrg * this.stats.speed;

    moveX -= this.additionalSpeed.x;
    moveY -= this.additionalSpeed.y;
    moveZ -= this.additionalSpeed.z;

    this.lastMovement = { x: moveX, y: moveY, z: moveZ };

    this.object.position.x -= moveX;
    this.object.position.y -= moveY;
    this.object.position.z -= moveZ;

    this.additionalSpeed.x *= this.velocity;
    this.additionalSpeed.y *= this.velocity;
    this.additionalSpeed.z *= this.velocity;

}