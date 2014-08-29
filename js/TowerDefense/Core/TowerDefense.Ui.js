/**
Logic Interaction with the game will be placed here.
*/
TowerDefense.Ui = {

    selectedTower: null,

    /**
     * Callback after the game is started.
     */
    initialize: function() {

        $('#game').addEventListener('click', this.click, false);
        document.addEventListener('keypress', this.keypress, false);

    },

    initializeControls: function(camera) {

        TowerDefense.controls = new THREE.OrbitControls( camera );
        TowerDefense.controls.damping = 0.2;

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
        // Display available towers
        $('#build-options').innerHTML = '';
        $('#build-info').innerHTML = '';
        if (TowerDefense.selectedObject.currentTower.id == null) {
            TowerDefense.availableTowers.forEach(function(tower, index) {
                var object = tower.object();
                var image = '<img class="img-circle" src="assets/towers/' + object.icon +'" />';
                var link = '<a onclick="TowerDefense.Ui.selectTower('+ index +');">'+ image +'</a>';
                $('#build-options').innerHTML += link;
            });
        }
        $('#build-menu').style.display = 'block';
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
        var tower = new TowerDefense.availableTowers[index].object;
        $('#build-info').innerHTML = tower.description;
        this.selectedTower = index;
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
        tower.create(TowerDefense.selectedObject);
        this.hideBuildMenu();
        TowerDefense.deselectAll();
        TowerDefense.updateEnemyMovements();
        this.selectedTower = null;
    }

}