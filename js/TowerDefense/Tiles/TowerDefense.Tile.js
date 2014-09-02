TowerDefense.Tile = function () {

    TowerDefense.Element.call( this );
    this.position = { x: 0, y: 0, z: 0 };
    this.gridPosition = { x: 0, y: 0 };
    this.material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity:.05 } );
    this.squareSize = 8.9;
    this.geometry = new THREE.PlaneGeometry( this.squareSize, this.squareSize);
    this.selectable = true;
    this.open = true; // open or closed for enemy traffic
    this.currentTower = {}; // Object with the current tower
}

TowerDefense.Tile.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Tile.prototype.constructor = TowerDefense.Tile;

/**
 * @todo remove the .add function here. Use Element.create instead.
 * @returns {THREE.Mesh|*}
 */
TowerDefense.Tile.prototype.create = function() {

    TowerDefense.Element.prototype.create.call(this);
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
    this.object.position.z = this.position.z;
    this.selected = false;

};

TowerDefense.Tile.prototype.update = function() {

    if (this.selected == true) {
        this.object.rotation.z += .015;
        var activeTimer = Date.now() * 0.00525;
        this.object.position.z = (this.squareSize / 5) + Math.sin(activeTimer) * .7;
    }

};