TowerDefense.CannonBullet = function () {

    TowerDefense.Bullet.call( this );

    this.type = 'BULLET';
    this.meshSprite = 'bullet-02';

    this.stats = {
        damage: 3,
        speed: .03 // Movement in units.
    }

    this.path = []; // Holds information of the movement
    this.p = 0;
    this.spline = new TowerDefense.Spline();

}

TowerDefense.CannonBullet.prototype = Object.create( TowerDefense.Bullet.prototype );

TowerDefense.CannonBullet.prototype.constructor = TowerDefense.CannonBullet;

/**
 * Update the bullet a little closer towards it target, with increasing speed
 * @return void
 */
TowerDefense.CannonBullet.prototype.update = function() {

    if (this.object.position.z < -1) {
        this.remove();
        return;
    }

    // Continue moving the bullet in a straight line after the target is destroyed from another object
    if (TowerDefense.objects[this.targetIndex] == null) {
        this.deadTimer--;
        if (this.deadTimer < 100) {
            this.object.material.opacity = (this.deadTimer / 100);
        }
        if (this.deadTimer <= 0) {
            this.remove();
        }
    }
    else {

        var target = TowerDefense.objects[this.targetIndex];

        // Simple collision detection
        if (TowerDefense.inRange(target.object.position, this.object.position,1,false)) {
            TowerDefense.objects[this.targetIndex].removeHealth(this.stats.damage);
            this.remove();
            return;
        }

        if (this.path[0] == null) {
            this.path[0] = { x: this.object.position.x, y: this.object.position.y, z: this.object.position.z };
            this.path[1] = {
                x: (target.object.position.x + this.object.position.x) / 2,
                y: (target.object.position.y + this.object.position.y) / 2,
                z: (this.object.position.z + 6)
            };
        }
        this.path[2] = target.object.position;

    }
    if (this.path == null || this.path.length < 3 || this.path[0].x == null || this.p >= 1) {
        this.remove();
        return;
    }

    var position = this.spline.get2DPoint( this.path, this.p );

    this.object.position.x = position.x;
    this.object.position.y = position.y;
    this.object.position.z = position.z;

    this.p += this.stats.speed;

    if (TowerDefense.counter%7 == 1) {
        var smoke = new TowerDefense.Decoration.SimpleSmoke();
        smoke.position.x = this.object.position.x - 1 + (Math.random() * 2);
        smoke.position.y = this.object.position.y - 1 + (Math.random() * 2);
        smoke.position.z = this.object.position.z - 1 + (Math.random() * 2);
        smoke.create();
        smoke.add();
        TowerDefense.scene.add(smoke.object);
    }

}