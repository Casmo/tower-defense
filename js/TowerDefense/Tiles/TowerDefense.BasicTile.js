TowerDefense.BasicTile = function () {

    TowerDefense.Tile.call( this );
    this.object = {};
    this.position = { x: 0, y: 0, z: 0 };
    this.material = new THREE.MeshBasicMaterial( { color: 0x5e370e } );
    this.geometry = new THREE.PlaneGeometry( .9, .9 );

}

TowerDefense.BasicTile.prototype = Object.create( TowerDefense.Tile.prototype );

TowerDefense.Tile.prototype = {

    constructor: TowerDefense.Tile,

    create: function() {

        this.object = new THREE.Mesh( this.geometry, this.material );
        this.object.position = this.position;
        this.add();
        return this.object;

    },

    add: function() {

        TowerDefense.__addObject( this );

    },

    update: function() {

        if (this.selected == true) {
            this.object.rotation.z += .025;
        }

    }

}