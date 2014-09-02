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
    this.position = { x: 0, y: 0, z: 0 };

}

TowerDefense.AdvancedTower.prototype = Object.create( TowerDefense.Tower.prototype );

TowerDefense.AdvancedTower.prototype.create = function () {

    TowerDefense.Tower.prototype.create.call(this);

    // Add lights
    if (TowerDefense.settings.advancedLight == true) {
        var lightHeight = 2.1;
        var light1 = new THREE.PointLight( 0xfffbd3,1.5, 15), light2, light3, light4, light5, light6;
        light1.position.x = -1;
        light1.position.y = lightHeight;
        light1.position.z = 2.8;
        if (TowerDefense.settings.debug == true) {
            light1.add(new THREE.Mesh (new THREE.BoxGeometry(.1,.1,.1), new THREE.MeshBasicMaterial ({color: 0xff9900})));
        }
        light2 = light1.clone();
        light3 = light1.clone();
        light4 = light1.clone();
        light5 = light1.clone();
        light6 = light1.clone();

        light2.position.x = -1;
        light2.position.z = -2.8;
        light3.position.x = -3.5;
        light3.position.z = -1.5;
        light4.position.x = -3.5;
        light4.position.z = 1.5;
        light5.position.x = 1.5;
        light5.position.z = -1.5;
        light6.position.x = 1.5;
        light6.position.z = 1.5;

        this.object.add( light1, light2, light3, light4, light5, light6 );
    }

    return this.object;

}