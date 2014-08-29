var TowerDefense = TowerDefense || {

    revision: 1,
    __currentLevel: 1,
    __pause: true,
    __loading: false,
    gameWidth: window.innerWidth,
    gameHeight: window.innerHeight,
    objects: [],
    grid: [], // holds the x, y position of each tile and it's tile object
    gridPath: [], // holds the x, y position of each tile and a zero (open) or one (closed)
    nodes: [], // Holds the x, y position and GraphNode object,
    scene: {}, // Holds the Three.js scene
    camera: {}, // Holds the game camera
    renderer: {}, // Holds the game renderer

    /**
     * Holds all available towers to build with their info
     */
    availableTowers: [
        {
            object: function() { return new TowerDefense.BasicTower(); }
        }
    ],

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

    /**
     * Holds the a* object for calculating paths
     * @todo remove
     */


    initialize: function() {

        TowerDefense.Ui.initialize();

    },

    __addObject: function (object) {

        this.objects[object.id] = object;

    },

    __removeObject: function (object) {

        if (object.object != null) {
            TowerDefense.scene.remove(object.object);
        }
        delete(this.objects[object.id]);
        delete(object);

    },

    update: function() {

        this.objects.forEach( function(object) {

            object.update();

        });

        TWEEN.update();

    },

    deselectAll: function() {

        this.objects.forEach(function(object, index) {

            if (typeof object.deselect == 'function') {

                object.deselect();

            }

        });

    },

    /**
     * Loops through all enemies and update the path. Usefull after building a tower.
     */
    updateEnemyMovements: function() {

        this.objects.forEach( function(object) {

            if (object.type != null && object.type == 'ENEMY') {
                object.setPath();
            }

        });

    },

    Spline: function () {
        var c = [], v2 = { x: 0, y: 0, z: 0 },
          point, intPoint, weight;
        this.get2DPoint = function ( points, k ) {
            point = ( points.length - 1 ) * k;
            intPoint = Math.floor( point );
            weight = point - intPoint;
            c[ 0 ] = intPoint == 0 ? intPoint : intPoint - 1;
            c[ 1 ] = intPoint;
            c[ 2 ] = intPoint > points.length - 2 ? points.length - 1 : intPoint + 1;
            c[ 3 ] = intPoint > points.length - 3 ? points.length - 1 : intPoint + 2;
            v2.x = interpolate( points[ c[ 0 ] ].x, points[ c[ 1 ] ].x, points[ c[ 2 ] ].x, points[ c[ 3 ] ].x, weight );
            v2.y = interpolate( points[ c[ 0 ] ].y, points[ c[ 1 ] ].y, points[ c[ 2 ] ].y, points[ c[ 3 ] ].y, weight );
            v2.z = interpolate( points[ c[ 0 ] ].z, points[ c[ 1 ] ].z, points[ c[ 2 ] ].z, points[ c[ 3 ] ].z, weight );
            // Get current point
            v2.gridPosition = points[c[1]].gridPosition;
            return v2;
        }
        // Catmull-Rom
        function interpolate( p0, p1, p2, p3, t ) {
            var v0 = ( p2 - p0 ) * 0.5;
            var v1 = ( p3 - p1 ) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;
        }
    }

}