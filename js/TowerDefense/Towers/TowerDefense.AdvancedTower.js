TowerDefense.AdvancedTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Advanced Tower';
    this.description = '<p>Advanced tower. Awesome.</p>';
    this.meshObject = 'tower-02';
    this.meshTexture = 'tower-02';
    this.stats = {
        costs: 9,
        speed: 1000,
        range: 25
    }
    this.icon = 'tower-02.png';
    this.material = new THREE.MeshLambertMaterial( { color: 0xcccccc } );
    this.materialEmissive = '0xfffde8';
    this.bulletOffset = {
        0: { x: 0, y: 0, z: 4.8 },
        1: { x: -2, y: 0, z: 4.8 },
        2: { x: 0, y: -2, z: 4.8 },
        3: { x: -2, y: -2, z: 4.8 }
    }
    this.bullet = function () { return new TowerDefense.Bullet(); };

}

TowerDefense.AdvancedTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.AdvancedTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;

    return this.object;

}

/**
 * Shoot 4 bullets to random enemies
 */
TowerDefense.AdvancedTower.prototype.shoot = function () {

    this.lastShot = Date.now();

    for (var i = 0; i < 4; i++) {
    // We need the position of the parent (the tile)
        this.shootingTargetIndex = TowerDefense.findEnemyInRage(this.object.parent.position, this.stats.range);
        if (TowerDefense.objects[this.shootingTargetIndex] != null) {
            var bullet = this.bullet();
            bullet.create();
            bullet.targetIndex = this.shootingTargetIndex;
            bullet.object.position.x = this.object.parent.position.x + this.bulletOffset[i].x;
            bullet.object.position.y = this.object.parent.position.y + this.bulletOffset[i].y;
            bullet.object.position.z = this.object.parent.position.z + this.bulletOffset[i].z;
            TowerDefense.scene.add(bullet.object);
            TowerDefense.__addObject(bullet);
        }
    }

}