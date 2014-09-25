TowerDefense.BadAssTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Badass Tower';
    this.description = '<p>Badass tower. Bad ass.</p>';
    this.meshObject = 'tower-03';
    this.meshTexture = 'tower-03';
    this.stats = {
        costs: 20,
        speed: 750,
        range: 30
    }
    this.icon = 'tower-03.png';
    this.material = new THREE.MeshLambertMaterial( { color: 0xcccccc } );
    this.materialEmissive = '0xcecece';
    this.bulletOffset = { x: 0, y: 0, z: 9.8 };
    this.bullet = function () { return new TowerDefense.RocketBullet(); };

}

TowerDefense.BadAssTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.BadAssTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    this.object.rotation.x = Math.PI / 2;

    return this.object;

}

TowerDefense.BadAssTower.prototype.shoot = function () {

    this.lastShot = Date.now();

    for (var i = 0; i < 3; i++) {
        // We need the position of the parent (the tile)
        this.shootingTargetIndex = TowerDefense.findEnemyInRage(this.object.parent.position, this.stats.range);
        if (TowerDefense.objects[this.shootingTargetIndex] != null) {
            var bullet = this.bullet();
            bullet.create();
            bullet.parentPosition = this.object.parent.position;
            bullet.parentRange = this.stats.range;
            bullet.targetIndex = this.shootingTargetIndex;
            bullet.object.position.x = this.object.parent.position.x + this.bulletOffset.x;
            bullet.object.position.y = this.object.parent.position.y + this.bulletOffset.y;
            bullet.object.position.z = this.object.parent.position.z + this.bulletOffset.z;
            TowerDefense.scene.add(bullet.object);
            TowerDefense.__addObject(bullet);
        }
    }

}