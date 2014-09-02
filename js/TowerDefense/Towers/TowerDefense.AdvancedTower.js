TowerDefense.AdvancedTower = function () {

    TowerDefense.Tower.call( this );

    this.name = 'Advanced Tower';
    this.description = '<p>Advanced tower. Awesome.</p>';
    this.costs = 1;
    this.speed = 1;
    this.range = 1;
    this.meshObject = 'tower-02';
    this.meshTexture = 'tower-02';
    this.icon = 'default.png';
    this.material = new THREE.MeshLambertMaterial( { color: 0xcccccc } );
    this.rotation = {x: Math.PI / 2, y: 0, z: 0 };
    this.position = { x: 0, y: 0, z: .05 };

}

TowerDefense.AdvancedTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.AdvancedTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    // Add lights
    // @todo settings check
    var lightHeight = 2.1;
    var light1 = new THREE.PointLight( 0xffffff,1.5, 15 );
    light1.position.x = -1;
    light1.position.y = lightHeight;
    light1.position.z = 2.8;
    light1.add(new THREE.Mesh (new THREE.BoxGeometry(.1,.1,.1), new THREE.MeshBasicMaterial ({color: 0xff9900 })));

    var light2 = new THREE.PointLight( 0xffffff,1.5, 15 );
    light2.position.x = -1;
    light2.position.y = lightHeight;
    light2.position.z = -2.8;
    light2.add(new THREE.Mesh (new THREE.BoxGeometry(.1,.1,.1), new THREE.MeshBasicMaterial ({color: 0xff9900 })));

    var light3 = new THREE.PointLight( 0xffffff,1.5, 15 );
    light3.position.x = -3.5;
    light3.position.y = lightHeight;
    light3.position.z = -1.5;
    light3.add(new THREE.Mesh (new THREE.BoxGeometry(.1,.1,.1), new THREE.MeshBasicMaterial ({color: 0xff9900 })));

    var light4 = new THREE.PointLight( 0xffffff,1.5, 15 );
    light4.position.x = -3.5;
    light4.position.y = lightHeight;
    light4.position.z = 1.5;
    light4.add(new THREE.Mesh (new THREE.BoxGeometry(.1,.1,.1), new THREE.MeshBasicMaterial ({color: 0xff9900 })));

    var light5 = new THREE.PointLight( 0xffffff,1.5, 15 );
    light5.position.x = 1.5;
    light5.position.y = lightHeight;
    light5.position.z = -1.5;
    light5.add(new THREE.Mesh (new THREE.BoxGeometry(.1,.1,.1), new THREE.MeshBasicMaterial ({color: 0xff9900 })));

    var light6 = new THREE.PointLight( 0xffffff,1.5, 15 );
    light6.position.x = 1.5;
    light6.position.y = lightHeight;
    light6.position.z = 1.5;
    light6.add(new THREE.Mesh (new THREE.BoxGeometry(.1,.1,.1), new THREE.MeshBasicMaterial ({color: 0xff9900 })));


    this.object.add( light1 );
    this.object.add( light2 );
    this.object.add( light3 );
    this.object.add( light4 );
    this.object.add( light5 );
    this.object.add( light6 );

    return this.object;

}