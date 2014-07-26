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
            if (typeof TowerDefense.objects[intersects[0].object.objectIndex].select == 'function') {
                TowerDefense.objects[intersects[0].object.objectIndex].select();
            }
        }
    }

}
/**
 * Callback when the player clicks on the document.
 * @param object event the click event
 * @todo I would like to have this only activated when the player clicked UP & DOWN
 * on the tile instead of just UP or DOWN.
 */
function onDocumentMouseUp(event) {
    event.preventDefault();
    var vector = new THREE.Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      - (event.clientY / window.innerHeight) * 2 + 1,
      0.5);
    projector.unprojectVector(vector, camera);
    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = ray.intersectObjects(tiles);
    if (intersects.length > 0) {
        return intersects[0].object.callback();
    }
}