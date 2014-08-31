/**
Logic Interaction with the game will be placed here.
*/
TowerDefense.Ui = {

    selectedTower: null,

    /**
     * Holds THREE.js objects for rendering the WebGL canvas such as scene, camera for the
     * menu.
     */
    scene: {},
    camera: {},
    renderer: {},
    projector: {},

    /**
     * Holds all the game objects. The .update() function will be called for each main
     * update.
     */
    objects: [],

    /**
     * Callback after the game is started.
     */
    initialize: function() {

        $('#game').addEventListener('click', this.click, false);
        window.addEventListener("resize", this.windowResized, false);
        document.addEventListener('keypress', this.keypress, false);

        /**
         * Updates game stats and related dom elements if they exists.
         * @todo do this with some sort of data binding attribute.
         */
        Object.observe(TowerDefense.stats, function (changes) {
            changes.forEach(function(change) {
                if ($('#game-' + change.name) != null) {
                    $('#game-' + change.name).innerHTML = change.object[change.name];
                }
            });
        });

    },

    initializeControls: function(camera) {

        TowerDefense.controls = new THREE.OrbitControls( camera );
        TowerDefense.controls.damping = 0.2;

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
            if (intersects.length > 0) {
                for (var i = 0; i < intersects.length; i++) {
                    var currentObject = TowerDefense.objects[intersects[i].object.objectIndex];
                    if (currentObject.selectable == true && typeof currentObject.select == 'function' && currentObject.selected == false) {
                        TowerDefense.deselectAll();
                        currentObject.select();
                    }
                }
            }
        }
    },

    keypress: function(event) {
        if (event.keyCode == 49) {
            spawnEnemy();
        }
        console.log('Keycode pressed: ' + event.keyCode);
    },

    /**
     * Displays available towers to place on the selected tile
     */
    showBuildMenu: function() {
        $('#build-menu').style.display = 'block';
        this.createScene();
        this.clearScene();

        $('#build-options').innerHTML = '';
        $('#build-info').innerHTML = '';
        if (TowerDefense.selectedObject.currentTower.id == null) {
            TowerDefense.availableTowers.forEach(function(tower, index) {
                var object = tower.object();
                var image = '<img class="img-circle game-stat" src="assets/towers/' + object.icon +'" />';
                var link = '<a onclick="TowerDefense.Ui.selectTower('+ index +');">'+ image +'</a>';
                $('#build-options').innerHTML += link;
            });
        }
    },

    hideBuildMenu: function() {
        TowerDefense.deselectAll();
        $('#build-menu').style.display = 'none';
    },

    /**
     * Selects a  and display the information
     * @param index the index of TowerDefense.availableTowers
     */
    selectTower: function (index) {
        if (TowerDefense.selectedObject.id == null) {
            return;
        }
        this.clearScene();
        var tower = new TowerDefense.availableTowers[index].object;
        var object = new THREE.Mesh( tower.geometry, tower.material );
        this.objects.push(object);
        this.scene.add(object);

        $('#build-info').innerHTML = tower.description;
        this.selectedTower = index;
    },

    /**
     * Creates the scene for the build menu where selected towers will be placed.
     */
    createScene: function() {
        if (this.scene.id  != null) {
            return;
        }
        var buildSizeWidth = $('#build-canvas').clientWidth;
        if (buildSizeWidth < 200) {
            buildSizeWidth = 200;
        }
        var buildSizeHeight = buildSizeWidth / 16 * 9;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 40, buildSizeWidth / buildSizeHeight, 0.1, 1000 );
        this.camera.position.x = 2.5;
        this.camera.position.y = -3;
        this.camera.position.z = .1;
        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( buildSizeWidth, buildSizeHeight );

        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;

        this.renderer.shadowCameraNear = 3;
        this.renderer.shadowCameraFar = TowerDefense.camera.far;
        this.renderer.shadowCameraFov = 50;

        this.renderer.shadowMapBias = 0.0039;
        this.renderer.shadowMapDarkness = 0.5;
        this.renderer.shadowMapWidth = 1024;
        this.renderer.shadowMapHeight = 1024;

        // Light
        var light = new THREE.PointLight( 0xffffff );
        light.position.x = 1;
        light.position.y = 1;
        light.position.z = 2;
        this.scene.add(light);

        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 500, 0 );
        this.scene.add( hemiLight );

        $('#build-canvas').innerHTML = '';
        $('#build-canvas').appendChild( this.renderer.domElement );
    },

    /**
     * Clears all objects from a scene
     * @param scene (optional) the scene to clear. Will use this.scene by default
     */
    clearScene: function(scene) {
        if (scene == null && this.scene != null && this.scene.id != null) {
            scene = this.scene;
        }
        if (scene == null || scene.id == null) {
            return;
        }
        var self = this;
        this.objects.forEach(function (object) {
            self.scene.remove(object);
        });
    },

    update: function() {
        if (this.scene.id != null) {
            this.objects.forEach(function(object) {
                if (typeof object.update == 'function') {
                    object.update();
                }
            });
            this.renderer.render(this.scene, this.camera);
        }
    },

    /**
     * Creates a new tower on the selected tile. Returns false if the tower is failed to
     * build.
     */
    buildTower: function () {
        if (this.selectedTower == null) {
            $('#build-info').innerHTML = 'Select a tower to build.';
            return;
        }
        if (TowerDefense.selectedObject.id == null) {
            return;
        }
        var tower = new TowerDefense.availableTowers[this.selectedTower].object;
        tower.create();
        if (tower.spawn(TowerDefense.selectedObject) === false) {
            return;
        }
        tower.add();
        this.hideBuildMenu();
        TowerDefense.deselectAll();
        TowerDefense.updateEnemyMovements();
        this.selectedTower = null;
    }

}