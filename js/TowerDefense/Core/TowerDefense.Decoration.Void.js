TowerDefense.Decoration.Void = function () {

    TowerDefense.Decoration.call( this );

    this.position = {
        x: 0,
        y: 0,
        z: 0
    };

    this.particleCount = 100;

}

TowerDefense.Decoration.Void.prototype = Object.create( TowerDefense.Decoration.prototype );

TowerDefense.Decoration.Void.prototype.constructor = TowerDefense.Decoration.Void;

TowerDefense.Decoration.prototype.create = function() {

      var particles = new THREE.Geometry(),
      pMaterial = new THREE.PointCloudMaterial({
          color: 0x000000,
          transparent: true,
          size:1
      });

// now create the individual particles
    for (var p = 0; p < this.particleCount; p++) {

        // create a particle with random
        // position values, -250 -> 250
        var particle = new THREE.Vector3(this.position.x, this.position.y, this.position.z);

        // add it to the geometry
        particle.life = Math.random() * 60;
        particle.moveX = (Math.random() * .1 - .05);
        particle.moveY = (Math.random() * .1 - .05);
        particle.moveZ = (Math.random() * .1 - .05);
        particles.vertices.push(particle);
    }

// create the particle system
    this.object = new THREE.PointCloud(
      particles,
      pMaterial
    );
    this.object.sortParticles = true;
    return this.object;

}

TowerDefense.Decoration.Void.prototype.update = function () {
    var pCount = this.particleCount;
    while (pCount--) {
        // get the particle
        var particle = this.object.geometry.vertices[pCount];
        // update the velocity with
        // a splat of randomniz
        particle.x += particle.moveX;
        particle.y += particle.moveY;
        particle.z += particle.moveZ;
        particle.life--;
        if (particle.life < 0) {
            particle.life = 60;
            particle.x = (Math.random() * 4 - 2);
            particle.y = (Math.random() * 4 - 2);
            particle.z = Math.random() * 6;
        }
    }

}