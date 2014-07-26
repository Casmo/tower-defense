TowerDefense.Tile = function () {

    TowerDefense.Element.call( this );
    this.position = { x: 0, y: 0, z: 0 };
    this.material = new THREE.MeshBasicMaterial( { color: 0x5e370e } );
    this.geometry = new THREE.PlaneGeometry( .9, .9 );

}

TowerDefense.Tile.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Tile.prototype.constructor = TowerDefense.Tile;

TowerDefense.Tile.prototype.create = function() {

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.position = this.position;
    this.add();
    return this.object;

};

TowerDefense.Tile.prototype.add = function() {

    TowerDefense.__addObject(this);

};

TowerDefense.Tile.prototype.select = function() {

    this.selected = true;

};

TowerDefense.Tile.prototype.deselect = function() {

    this.object.rotation.z = 0;
    this.selected = false;

};

TowerDefense.Tile.prototype.update = function() {

    if (this.selected == true) {
        this.object.rotation.z += .025;
    }

};