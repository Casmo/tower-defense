TextureAnimator = function (texture, tilesHorizontal, tilesVertical)
{
    // note: texture passed by reference, will be updated by the update function.

    this.tilesHorizontal = tilesHorizontal;
    this.tilesVertical = tilesVertical;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet.
    this.numberOfTiles = tilesHorizontal * tilesVertical;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

    // which image is currently being displayed?
    this.currentTile = 0;

    this.currentLoop = 0;
    this.maxLoops = 0;
    this.finished = false;

    this.update = function() {

        this.currentTile++;
        if (this.currentTile == this.numberOfTiles) {
            this.currentTile = 0;
            this.currentLoop++;
        }
        var currentColumn = this.currentTile % this.tilesHorizontal;
        texture.offset.x = currentColumn / this.tilesHorizontal;
        var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
        texture.offset.y = currentRow / this.tilesVertical;
        if (this.maxLoops > 0 && this.maxLoops <= this.currentLoop) {
            this.finished = true;
        }
    };
}