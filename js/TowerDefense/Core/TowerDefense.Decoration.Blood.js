TowerDefense.Blood = function () {

    TowerDefense.Decoration.call( this );

    this.geometry = new THREE.PlaneGeometry(4,4);
    this.materialTransparent = true;
    this.meshTexture = 'blood-128';
}

TowerDefense.Blood.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Blood.prototype.constructor = TowerDefense.Blood;

TowerDefense.Blood.prototype.create = function () {

    TowerDefense.Element.prototype.create.call(this);

    this.object.rotation.z = Math.random() * Math.PI;

    return this.object;

}