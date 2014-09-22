TowerDefense.Decoration = function () {

    TowerDefense.Element.call( this );
    this.repeat = 1;
}

TowerDefense.Decoration.prototype = Object.create( TowerDefense.Element.prototype );

TowerDefense.Decoration.prototype.constructor = TowerDefense.Decoration;

TowerDefense.Decoration.prototype.create = function() {

    TowerDefense.Element.prototype.create.call(this);
    this.AnimationUpdater.maxLoops = this.repeat;
    return this.object;

}

TowerDefense.Decoration.prototype.update = function() {

    if (typeof this.AnimationUpdater.update == 'function') {
        if (TowerDefense.counter%2==1) {
            this.AnimationUpdater.update();
            if (this.AnimationUpdater.finished == true) {
                this.remove();
            }
        }
    }

}