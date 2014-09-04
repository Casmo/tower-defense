TowerDefense.Bullet = function () {

    TowerDefense.Element.call( this );

    this.type = 'BULLET';

    /**
     * Current 3D position in the world
     * @type {{x: number, y: number, z: number}}
     */
    this.position = { x: 0, y: 0, z: 1 };

    this.stats = {
        damage: 1,
        speed: 450 // Time in MS
    }

    this.targetIndex = -1;

    this.material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
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