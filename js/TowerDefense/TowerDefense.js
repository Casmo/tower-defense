var TowerDefense = TowerDefense || {

    revision: 1,
    __currentLevel: 1,
    __pause: true,
    __loading: false,
    gameWidth: 640,
    gameHeight: 480,
    objects: [],

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

    }

}