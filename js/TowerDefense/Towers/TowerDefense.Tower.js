TowerDefense.Tower = function () {

    TowerDefense.Element.call( this );
    this.position = { x: 0, y: 0, z: 1 };
    this.material = new THREE.MeshBasicMaterial( { color: 0x368218 } );
    this.geometry = new THREE.BoxGeometry( .85, .85, 2 );

}
// @todo create prototype
TowerDefense.Tower.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Tower.prototype.constructor = TowerDefense.Tower;

TowerDefense.Tower.prototype.create = function() {

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.position.x = this.position.x;
    this.object.position.y = this.position.y;
    this.object.position.z = this.position.z;
    this.add();
    return this.object;

};