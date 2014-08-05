var TowerDefense = TowerDefense || {

    revision: 1,
    __currentLevel: 1,
    __pause: true,
    __loading: false,
    gameWidth: 640,
    gameHeight: 480,
    objects: [],
    grid: [], // holds the x, y position of each tile

    /**
     * Holds the tile where monsters will spawn
     * @type {{}}
     */
    startTile: {},

    /**
     * Holds the tile where monsters will despawn
     * @type {{}}
     */
    endTile: {},

    initialize: function() {

        TowerDefense.Ui.initialize();

    },

    __addObject: function (object) {

        this.objects.push(object);

    },

    update: function() {

        this.objects.forEach( function(object) {

            object.update();

        });

    },

    deselectAll: function() {

        this.objects.forEach(function(object, index) {

            if (typeof object.deselect == 'function') {

                object.deselect();

            }

        });

    }

}