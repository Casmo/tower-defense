TowerDefense.Tile = function () {

    TowerDefense.Element.call( this );
    this.position = { x: 0, y: 0, z: 0 };
    this.gridPosition = { x: 0, y: 0 };
    this.material = new THREE.MeshLambertMaterial( { color: 0x5e370e } );
    this.geometry = new THREE.BoxGeometry( .98, .98,.1 );
    this.selectable = true;
    this.open = true; // open or closed for enemy traffic
    this.currentTower = {}; // Object with the current tower
}

TowerDefense.Tile.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Tile.prototype.constructor = TowerDefense.Tile;

TowerDefense.Tile.prototype.create = function() {

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.receiveShadow = true;
    this.object.position = this.position;
    this.add();
    return this.object;

};

TowerDefense.Tile.prototype.select = function() {

    this.selected = true;
    TowerDefense.Element.selectedObject = this;
    // Display available towers
    $('#build-options').innerHTML = '';
    $('#build-info').innerHTML = '';
    if (this.currentTower.id == null) {
        TowerDefense.availableTowers.forEach(function(tower, index) {
            var object = tower.object();
            var image = '<img src="assets/towers/' + object.icon +'" />';
            var link = '<a onclick="TowerDefense.Ui.selectTower('+ index +');">'+ image +'</a>';
            $('#build-options').innerHTML += link;
        });
    }
    TowerDefense.Ui.showBuildMenu();

};

TowerDefense.Tile.prototype.deselect = function() {

    this.object.rotation.z = 0;
    this.object.position.z = 0;
    this.selected = false;

};

TowerDefense.Tile.prototype.update = function() {

    if (this.selected == true) {
        this.object.rotation.z += .025;
        var activeTimer = Date.now() * 0.00525;
        this.object.position.z = .5 + Math.sin(activeTimer) * .3;
    }

};