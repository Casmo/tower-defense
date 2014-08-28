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

        controls = new THREE.OrbitControls( camera );
        controls.damping = 0.2;

    },

    click: function(event) {

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
          (event.offsetX / TowerDefense.gameWidth) * 2 - 1,
          - (event.offsetY / TowerDefense.gameHeight) * 2 + 1,
          0.5);
        projector.unprojectVector(vector, camera);
        var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
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
        $('#buildmenu').style.display = 'block';
    },

    hideBuildMenu: function() {
        TowerDefense.deselectAll();
        $('#buildmenu').style.display = 'none';
    },

    /**
     * Selects a  and display the information
     * @param index the index of TowerDefense.availableTowers
     */
    selectTower: function (index) {
        if (TowerDefense.Element == null || TowerDefense.Element.selectedObject == null) {
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
        if (TowerDefense.Element == null || TowerDefense.Element.selectedObject == null) {
            return;
        }
        var tower = new TowerDefense.availableTowers[this.selectedTower].object;
        tower.create(TowerDefense.Element.selectedObject);
        //scene.add(mesh);
        this.hideBuildMenu();
        TowerDefense.deselectAll();
        TowerDefense.updateEnemyMovements();
        this.selectedTower = null;
    }

}