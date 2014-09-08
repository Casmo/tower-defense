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
            TowerDefense.Ui.hideBuildMenu();
            if (intersects.length > 0) {
                for (var i = 0; i < intersects.length; i++) {
                    var currentObject = TowerDefense.objects[intersects[i].object.objectIndex];
                    if (currentObject != null && currentObject.selectable == true && typeof currentObject.select == 'function' && currentObject.selected == false) {
                        currentObject.select();
                        break;
                    }
                }
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
        if (key == KeyEvent.DOM_VK_B) {
            TowerDefense.Ui.buildTower();
        }
        if (key == KeyEvent.DOM_VK_C || key == KeyEvent.DOM_VK_ESCAPE) {
            TowerDefense.Ui.hideBuildMenu();
        }
        if (key == KeyEvent.DOM_VK_N) {
            newGame();
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

    /**
     * Displays available towers to place on the selected tile
     */
    showBuildMenu: function() {
        $('#build-menu').style.display = 'block';
        $('#build-info').style.display = 'none';
        this.createScene();
        this.clearScene();

        $('#build-buildings').innerHTML = '';
        $('#build-info').innerHTML = '';
        if (TowerDefense.selectedObject.currentTower.id == null) {
            TowerDefense.availableTowers.forEach(function(tower, index) {
                var object = tower.object();
                var image = '<img class="img-circle game-stat" src="assets/towers/' + object.icon +'" />';
                var link = '<a onclick="TowerDefense.Ui.selectTower('+ index +');">'+ image +'</a>';
                $('#build-buildings').innerHTML += link;
            });
        }
    },

    hideBuildMenu: function() {
        this.clearScene();
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
        this.selectedTower = index;
        this.clearScene();
        var tower = TowerDefense.availableTowers[index].object();
        var bullet = tower.bullet();
        tower.create();
        this.objects.push(tower);
        this.scene.add(tower.object);

        $('#build-info').innerHTML = tower.description;

        var noResourcesClass = '';
        if (tower.stats.costs > TowerDefense.stats.resources) {
            noResourcesClass = ' class="text-danger"';
        }
        $('#build-info').innerHTML += '<p'+ noResourcesClass +'><img src="assets/ui/resources.png" /> ' + tower.stats.costs + '</p>';

        // Create stats bars
        var statsHtml = '';
        // range
        var range = Math.round(100 / TowerDefense.config.maxRange * tower.stats.range);
        statsHtml += 'Range';
        statsHtml += '<div class="progress">';
        statsHtml += '<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+ range +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ range +'%">';
        statsHtml += '</div>';
        statsHtml += '</div>';
        // speed (lower = better)
        var speed = Math.round(100 * TowerDefense.config.maxSpeed / tower.stats.speed);
        statsHtml += 'Speed';
        statsHtml += '<div class="progress">';
        statsHtml += '<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+ speed +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ speed +'%">';
        statsHtml += '</div>';
        statsHtml += '</div>';
        // damage
        var damage = Math.round(100 / TowerDefense.config.maxDamage * bullet.stats.damage);
        statsHtml += 'Damage';
        statsHtml += '<div class="progress">';
        statsHtml += '<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="'+ damage +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ damage +'%">';
        statsHtml += '</div>';
        statsHtml += '</div>';

        $('#build-info').innerHTML += statsHtml;
        $('#build-info').style.display = 'block';

        // If new
        var buildOptionsHtml = '<div class="btn-group btn-group" id="build-buttons">';
        buildOptionsHtml += '<a onclick="TowerDefense.Ui.hideBuildMenu();" class="btn btn-default"><i class="key-code">C</i>lose</a>';
        buildOptionsHtml += '<a onclick="TowerDefense.Ui.buildTower();" class="btn btn-primary"><i class="key-code">B</i>uild</a>';
        buildOptionsHtml += '</div>';
        $('#build-options').innerHTML = buildOptionsHtml;

        this.render();
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
        this.clearScene();
        var tower = TowerDefense.availableTowers[this.selectedTower].object();

        if (tower.stats.costs > TowerDefense.stats.resources) {
            $('#build-info').innerHTML = 'Not enough money.';
            return;
        }

        tower.create();

        if (tower.spawn(TowerDefense.selectedObject) === false) {
            return;
        }
        TowerDefense.stats.resources -= tower.stats.costs;
        tower.add();
        this.hideBuildMenu();
        TowerDefense.deselectAll();
        TowerDefense.updateEnemyMovements();
        this.selectedTower = null;
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
        this.camera.position.x = 12;
        this.camera.position.y = -22;
        this.camera.position.z = 1;
        this.camera.up = new THREE.Vector3(0,0,1);
        this.renderer = new THREE.CanvasRenderer();
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
        this.objects.forEach(function (object) {
            scene.remove(object.object);
        });
        this.render();
    },

    update: function() {
        return; // @todo remove when WebGL can share resources over multiple context
        this.render();
    },

    render: function() {

        if (this.scene.id != null) {
            // Update camera
            var x = this.camera.position.x,
              y = this.camera.position.y,
              rotSpeed = .01;

            this.camera.position.x = x * Math.cos(rotSpeed) - y * Math.sin(rotSpeed);
            this.camera.position.y = y * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);

            this.camera.lookAt(new THREE.Vector3(0,0,8));

            this.renderer.render(this.scene, this.camera);
            this.objects.forEach(function(object) {
                if (typeof object.update == 'function') {
                    object.update();
                }
            });
        }

    }

}