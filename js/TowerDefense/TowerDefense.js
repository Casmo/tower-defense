var TowerDefense = TowerDefense || function() {

    this.revision = 1;
    this.gameWidth = 640;
    this.gameHeight = 480;
    this.currentLevel = 1;
    this.objects = [];
    this.pause = true;
    this.loading = false;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera( this.gameWidth / - 2, this.gameWidth / 2, this.gameHeight / 2, this.gameHeight / - 2, 0, 250 );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( this.gameWidth, this.gameHeight );
    $('#game').style.marginLeft = -(this.gameWidth / 2) + 'px';
    $('#game').style.marginTop = -(this.gameHeight / 2) + 'px';
    $('#game').appendChild(this.renderer.domElement);

};

TowerDefense.prototype = {

    /**
     * Resets the game
     */
    reset: function() {

        this.currentLevel = 1;
        this.objects = [];

    },

    newGame: function() {

        this.reset();
        this.play();

    },

    __addObject: function( object ) {
        this.objects.push(object);
    },

    pauseGame: function(level) {

        if (level == null) {
            level = this.currentLevel;
        }
        this.__setLevel(level);
        this.pause = true;

    },

    play: function() {

        this.pause = false;

    },

    /**
     * Game main loop. Loops through all the objects and update them individual.
     */
    update: function() {

        if (this.pause == true || this.loading == true) {
            return true;
        }
        this.objects.forEach(function(object, index) {
            if (typeof object.update == 'function') {
                object.update();
            }
        });

        // Update render
        this.renderer.render(this.scene, this.camera);

        return true;

    },

    /**
     * Saves a level into the LocalStorage
     * @param int newLevel
     * @private
     */
    __setLevel: function ( newLevel ) {

        this.currentLevel = newLevel;

    }

};