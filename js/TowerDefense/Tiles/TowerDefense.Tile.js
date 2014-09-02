TowerDefense.Tile = function () {

    TowerDefense.Element.call( this );
    this.position = { x: 0, y: 0, z: 0 };
    this.gridPosition = { x: 0, y: 0 };
    this.material = new THREE.MeshLambertMaterial( { color: 0x5e370e } );
    this.squareSize = 7.9;
    this.geometry = new THREE.BoxGeometry( this.squareSize, this.squareSize, (this.squareSize / 10) );
    this.selectable = true;
    this.open = true; // open or closed for enemy traffic
    this.currentTower = {}; // Object with the current tower
}

TowerDefense.Tile.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Tile.prototype.constructor = TowerDefense.Tile;

/**
 * @todo remove the .add function here.
 * @returns {THREE.Mesh|*}
 */
TowerDefense.Tile.prototype.create = function() {

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.receiveShadow = true;
    this.object.position = this.position;
    this.add();
    return this.object;

};

TowerDefense.Tile.prototype.select = function() {

    this.selected = true;
    TowerDefense.selectedObject = this;
    TowerDefense.Ui.showBuildMenu();

};

TowerDefense.Tile.prototype.deselect = function() {

    this.object.rotation.z = 0;
    this.object.position.z = 0;
    this.selected = false;

};

TowerDefense.Tile.prototype.update = function() {

    if (this.selected == true) {
        this.object.rotation.z += .015;
        var activeTimer = Date.now() * 0.00525;
        this.object.position.z = (this.squareSize / 5) + Math.sin(activeTimer) * .7;
    }

};