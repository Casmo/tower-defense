/**
Logic Interaction with the game will be placed here.
*/
TowerDefense.Ui = {

    level: {},

    /**
     * Callback after the game is started.
     */
    initialize: function() {

        $('#game').addEventListener('click', this.click, false);
        window.addEventListener("resize", this.windowResized, false);
        document.addEventListener('keyup', this.keyup, false);

        /**
         * Updates game stats and related dom elements if they exists.
         * @todo do this with some sort of data binding attribute.
         */
        Object.observe(TowerDefense.stats, function (changes) {
            changes.forEach(function(change) {
                if ($('#game-' + change.name) != null) {
                    $('#game-' + change.name).innerHTML = change.object[change.name];
                }
                // Remove the 'insufficient' class from elements that might be visible
                for (var i = 0; i < $('.'+ change.name).length; i++) {
                    var el = $('.'+ change.name)[i];
                    var statsCosts = el.innerHTML;
                    if (statsCosts <= change.object[change.name]) {
                        el.className = el.className.replace(/insufficient/, '');
                    }
                }
            });
        });

    },

    initializeControls: function(camera) {

        TowerDefense.controls = new THREE.OrbitControls( camera );
        TowerDefense.controls.damping = 0.2;
        TowerDefense.controls.minDistance = 30;
        TowerDefense.controls.maxDistance = 300;
        TowerDefense.controls.noPan = false;
        TowerDefense.controls.minPolarAngle = 0; // radians
        TowerDefense.controls.maxPolarAngle = 1.5; // radians

    },

    menu: function() {

        // show menu
        for (var i = 0; i < $('.status-menu').length; i++) {
            $('.status-menu')[i].style.display = 'block';
        }
        // hide in-game
        for (var i = 0; i < $('.status-in-game').length; i++) {
            $('.status-in-game')[i].style.display = 'none';
        }
        // hide game menu
        for (var i = 0; i < $('.status-menu-game').length; i++) {
            $('.status-menu-game')[i].style.display = 'none';
        }

        TowerDefense.reset();

    },

    gameMenu: function () {

        // hide menu
        for (var i = 0; i < $('.status-menu').length; i++) {
            $('.status-menu')[i].style.display = 'none';
        }
        // hide in-game
        for (var i = 0; i < $('.status-in-game').length; i++) {
            $('.status-in-game')[i].style.display = 'none';
        }
        // show game menu
        for (var i = 0; i < $('.status-menu-game').length; i++) {
            $('.status-menu-game')[i].style.display = 'block';
        }

        TowerDefense.reset();

    },

    // @todo save level
    playLevel: function() {

        TowerDefense.reset();

        // hide menu
        for (var i = 0; i < $('.status-menu').length; i++) {
            $('.status-menu')[i].style.display = 'none';
        }
        // show in-game
        for (var i = 0; i < $('.status-in-game').length; i++) {
            $('.status-in-game')[i].style.display = 'block';
        }
        // show game menu
        for (var i = 0; i < $('.status-menu-game').length; i++) {
            $('.status-menu-game')[i].style.display = 'none';
        }

        this.level = new TowerDefense.Level1();
        this.level.start();

    },

    windowResized: function() {
        if (TowerDefense.camera.updateProjectionMatrix != null) {
            TowerDefense.camera.aspect = window.innerWidth / window.innerHeight;
            TowerDefense.camera.updateProjectionMatrix();
            TowerDefense.renderer.setSize( window.innerWidth, window.innerHeight );
            TowerDefense.gameWidth = window.innerWidth;
            TowerDefense.gameHeight = window.innerHeight;
        }
    },

    click: function(event) {
        if (TowerDefense.projector.unprojectVector != null && TowerDefense.camera != null) {
            // Put scene objects in an array
            var objects = [];
            TowerDefense.objects.forEach(function(object, index) {
                if (object.object != null) {
                    object.object.objectIndex = index;
                    objects.push(object.object);
                }
            });

            event.preventDefault();
            var vector = new THREE.Vector3(
              (event.pageX / TowerDefense.gameWidth) * 2 - 1,
              - (event.pageY / TowerDefense.gameHeight) * 2 + 1,
              0.5);
            TowerDefense.projector.unprojectVector(vector, TowerDefense.camera);
            var ray = new THREE.Raycaster(TowerDefense.camera.position, vector.sub(TowerDefense.camera.position).normalize());
            var intersects = ray.intersectObjects(objects, true);
            var objectSelected = false;
            if (intersects.length > 0) {
                for (var i = 0; i < intersects.length; i++) {
                    var currentObject = TowerDefense.objects[intersects[i].object.objectIndex];
                    if (currentObject != null && currentObject.selectable == true && typeof currentObject.select == 'function' && currentObject.selected == false) {
                        TowerDefense.deselectAll();
                        currentObject.select();
                        objectSelected = true;
                        break;
                    }
                }
            }
            if (objectSelected == false) {
                TowerDefense.Ui.hideBuildMenu();
            }
        }
    },

    keyup: function(event) {
        var key = event.keyCode || event.which;
        if (key == KeyEvent.DOM_VK_E) {
            spawnEnemy();
        }
        if (key == KeyEvent.DOM_VK_U) {
            spawnEnemy('ufo');
        }
        if (key == KeyEvent.DOM_VK_1) {
            TowerDefense.Ui.buildTower(0);
        }
        if (key == KeyEvent.DOM_VK_2) {
            TowerDefense.Ui.buildTower(1);
        }
        if (key == KeyEvent.DOM_VK_3) {
            TowerDefense.Ui.buildTower(2);
        }
        if (key == KeyEvent.DOM_VK_C || key == KeyEvent.DOM_VK_ESCAPE) {
            TowerDefense.Ui.hideBuildMenu();
        }
        if (key == KeyEvent.DOM_VK_W) {
            TowerDefense.Ui.startWave();
        }
    },

    loadingProgress: function (item, loaded, total) {

        if (loaded < total) {
            if (this.loadingFadeout != null) {
                clearTimeout(this.loadingFadeout);
            }
            var percent = 100 / total * loaded;
            $('#loading-container').style.display = 'block';
            $('#loading').style.width = percent +'%';
            $('#loading').innerHTML = item;
        }
        else {
            $('#loading').style.width = '100%';
            this.loadingFadeout = setTimeout(function() {
                $('#loading-container').style.display = 'none';
            }, 1000);

        }

    },

    startWave: function() {

        if (this.level != null && typeof this.level.startWave == 'function') {
            this.level.startWave();
        }

    },

    /**
     * Displays available towers to place on the selected tile
     */
    showBuildMenu: function() {
        if (TowerDefense.selectedObject.currentTower.id == null) {
            $('#build-menu').innerHTML = '';
            TowerDefense.availableTowers.forEach(function(tower, index) {
                var extraClass = '';
                var object = tower.object();
                if (object.stats.costs > TowerDefense.stats.resources) {
                    extraClass = ' insufficient';
                }
                var image = '<img src="assets/towers/' + object.icon +'" />';
                var currencyDiv = '<div class="overlay overlay-black bottom text-center resources'+ extraClass +'">'+ object.stats.costs +'</div>';
                var link = '<a class="game-stat'+ extraClass +'" onclick="TowerDefense.Ui.buildTower('+ index +');">'+ currencyDiv + image +'</a>';
                $('#build-menu').innerHTML += link;
            });
            $('#build-menu').className = $('#build-menu').className.replace(/(\s)?slide-up/, '');
            $('#build-menu').className = $('#build-menu').className.replace(/(\s)?slide-down/, '');
            $('#build-menu').className += ' slide-up';
        }
    },

    hideBuildMenu: function() {
        TowerDefense.deselectAll();
        $('#build-menu').className = $('#build-menu').className.replace(/(\s)?slide-up/, '');
        $('#build-menu').className = $('#build-menu').className.replace(/(\s)?slide-down/, '');
        $('#build-menu').className += ' slide-down';
    },

    /**
     * Creates a new tower on the selected tile. Returns false if the tower is failed to
     * build.
     */
    buildTower: function (towerIndex) {
        if (towerIndex == null) {
//            $('#build-info').innerHTML = 'Select a tower to build.';
            return;
        }
        if (TowerDefense.selectedObject.id == null) {
            return;
        }
        var tower = TowerDefense.availableTowers[towerIndex].object();

        if (tower.stats.costs > TowerDefense.stats.resources) {
//            $('#build-info').innerHTML = 'Not enough money.';
            return;
        }

        if (tower.collisionable == true) {
            // First check if it is allowed...
            var testGrid = [];//TowerDefense.gridPath.slice();
            for (var i = 0; i < TowerDefense.gridPath.length; i++) {
                testGrid[i] = [];
                for (var j = 0; j < TowerDefense.gridPath[i].length; j++) {
                    var open = true;
                    if (TowerDefense.gridPath[i][j] == false) {
                        open = false;
                    }
                    testGrid[i][j] = open;
                }
            }
            testGrid[TowerDefense.selectedObject.gridPosition.x][TowerDefense.selectedObject.gridPosition.y] = false;
            TowerDefense.FindPath.postMessage(
              {
                  grid: testGrid,
                  start: {
                      x: TowerDefense.startTile.gridPosition.x,
                      y: TowerDefense.startTile.gridPosition.y
                  },
                  end: {
                      x: TowerDefense.endTile.gridPosition.x,
                      y: TowerDefense.endTile.gridPosition.y
                  },
                  returnAttributes: {
                      buildTower: towerIndex
                  }
              }
            );
        }
        else {
            tower.create();
            tower.spawn(TowerDefense.selectedObject);
            tower.add();
            TowerDefense.deselectAll();
            TowerDefense.Ui.hideBuildMenu();
        }
    }

}