TowerDefense.Tile = function () {

    TowerDefense.Element.call( this );
    this.gridPosition = { x: 0, y: 0 };
    this.material = new THREE.MeshPhongMaterial( { color: 0xffffff, transparent: true, opacity:0 } );
    this.squareSize = 9;
    this.geometry = new THREE.PlaneGeometry( this.squareSize, this.squareSize);
    this.selectable = true;
    this.open = true; // open or closed for enemy traffic
    this.currentTower = {}; // Object with the current tower
}

TowerDefense.Tile.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Tile.prototype.constructor = TowerDefense.Tile;

TowerDefense.Tile.prototype.select = function() {

    this.selected = true;
    TowerDefense.selectedObject = this;
    TowerDefense.Ui.showBuildMenu();
    this.object.material.opacity = .2;

};

TowerDefense.Tile.prototype.deselect = function() {

    this.selected = false;
    this.object.material.opacity = 0;

};

TowerDefense.Tile.prototype.update = function() {


//    if (this.selected == true) {
//        this.object.rotation.z += .015;
//        var activeTimer = Date.now() * 0.00525;
//        this.object.position.z = (this.squareSize / 5) + Math.sin(activeTimer) * .7;
//    }

};