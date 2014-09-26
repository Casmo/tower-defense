TowerDefense.Decoration.SimpleSmoke = function () {

    TowerDefense.Decoration.call( this );

    this.position = {
        x: 0,
        y: 0,
        z: 0
    };

    this.particleCount = 100;
    this.moveX = (Math.random() * .1 - .05);
    this.moveY = (Math.random() * .1 - .05);
    this.moveZ =  Math.random() * .1;
    this.live = 30;

}

TowerDefense.Decoration.SimpleSmoke.prototype = Object.create( TowerDefense.Decoration.prototype );

TowerDefense.Decoration.SimpleSmoke.prototype.constructor = TowerDefense.Decoration.SimpleSmoke;

TowerDefense.Decoration.prototype.create = function() {

    var particles = new THREE.Geometry(),
    pMaterial = new THREE.PointCloudMaterial({
        color: 0xff0000,
        transparent: true,
        size:1
    });
    for (var p = 0; p < this.particleCount; p++) {
        var particle = new THREE.Vector3(this.position.x, this.position.y, this.position.z);
        particles.vertices.push(particle);
    }
    this.object = new THREE.PointCloud(
        particles,
        pMaterial
    );
    this.object.sortParticles = true;
    return this.object;

}

TowerDefense.Decoration.SimpleSmoke.prototype.update = function () {
    var pCount = this.particleCount;
    while (pCount--) {
        var particle = this.object.geometry.vertices[pCount];
        particle.x += this.moveX;
        particle.y += this.moveY;
        particle.z += this.moveZ;
    }
    this.live--;
    if (this.live < 1) {
        this.remove();
    }

}