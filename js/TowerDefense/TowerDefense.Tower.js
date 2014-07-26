TowerDefense.Tower = function () {

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