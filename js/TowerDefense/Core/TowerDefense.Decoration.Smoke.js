TowerDefense.Decoration.Smoke = function () {

    TowerDefense.Decoration.call( this );

    this.animationSprite = {
        texture: 'smoke-40-128',
        tilesHorizontal: 10,
        tilesVertical: 1,
        tileDispDuration: 75 // Lower is faster
    };
}

TowerDefense.Decoration.Smoke.prototype = Object.create( TowerDefense.Decoration.prototype );

TowerDefense.Decoration.Smoke.prototype.constructor = TowerDefense.Decoration.Smoke;