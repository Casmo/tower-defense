/**
Logic Interaction with the game will be placed here.
*/
TowerDefense.Ui = {

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
                if (currentObject.selectable == true && typeof currentObject.select == 'function') {
                    TowerDefense.deselectAll();
                    currentObject.select();
                }
            }
        }
    },

    keypress: function(event) {
        // 1
        if (event.keyCode == 49) {
            TowerDefense.Ui.buildTower(1);
        }
        console.log(event.keyCode);
    },

    /**
     * Displays available towers to place on the selected tile
     */
    showBuildMenu: function() {
        $('#buildmenu').style.display = 'block';
    },

    hideBuildMenu: function() {
        $('#buildmenu').style.display = 'none';
    },

    /**
     * Creates a new tower on the selected tile. Returns false if the tower is failed to
     * build.
     * @param towerId
     */
    buildTower: function (towerId) {
        if (TowerDefense.Element == null || TowerDefense.Element.selectedObject == null) {
            return;
        }
        // @todo do some thing with towerId
        // @todo check if it is allowed here to add a dummy route from startTile to endTile
        var tower = new TowerDefense.BasicTower();
        var mesh = tower.create(TowerDefense.Element.selectedObject);
        scene.add(mesh);
        this.hideBuildMenu();
        TowerDefense.deselectAll();
    }

}