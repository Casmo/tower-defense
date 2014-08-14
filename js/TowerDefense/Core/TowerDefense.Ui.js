/**
Logic Interaction with the game will be placed here.
*/
TowerDefense.Ui = {

    /**
     * Callback after the game is started.
     */
    initialize: function() {

        $('#game').addEventListener('click', this.click, false);

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

    /**
     * Displays available towers to place on the selected tile
     */
    showBuildMenu: function() {
        $('#buildmenu').style.display = 'block';
    },

    hideBuildMenu: function() {
        $('#buildmenu').style.display = 'none';
    },

    buildTower: function (towerId) {
        // @todo do some thing with towerId
        // @todo check if it is allowed here to add a dummy route from startTile to endTile
        var tower = new TowerDefense.BasicTower();
        tower.position.x = TowerDefense.Element.selectedObject.object.position.x;
        tower.position.y = TowerDefense.Element.selectedObject.object.position.y;
        var mesh = tower.create();
        scene.add(mesh);
        this.hideBuildMenu();
        TowerDefense.deselectAll();
    }

}