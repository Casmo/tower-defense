TowerDefense.Tower = function () {

    this.position = { x: 0, y: 0, z: 0 };
    this.material = new THREE.MeshBasicMaterial( { color: 0xff9900 } );
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );

}
// @todo create prototype
//TowerDefense.Tower.prototype = Object.create( TowerDefense.prototype );

TowerDefense.Tower.prototype = {

    constructor: TowerDefense.Tower,

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

    }

}