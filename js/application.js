var gameRender;

function render() {

    gameRender = requestAnimationFrame(render, null);
    TowerDefense.update();
    TowerDefense.renderer.render(TowerDefense.scene, TowerDefense.camera);

}

function init() {

    TowerDefense.initialize();

}

function newGame() {

    TowerDefense.Ui.clearScene(TowerDefense.scene);
    TowerDefense.scene = new THREE.Scene();
    TowerDefense.camera = new THREE.PerspectiveCamera( 40, TowerDefense.gameWidth / TowerDefense.gameHeight, 0.1, 1000 );
    TowerDefense.camera.position.x = 60;
    TowerDefense.camera.position.y = -110;
    TowerDefense.camera.position.z = 80;
    TowerDefense.camera.up = new THREE.Vector3(0,0,1);
    TowerDefense.camera.lookAt(new THREE.Vector3(0,0,0));
    TowerDefense.renderer = new THREE.WebGLRenderer();
    TowerDefense.renderer.setSize( TowerDefense.gameWidth, TowerDefense.gameHeight );

    TowerDefense.renderer.shadowMapEnabled = true;
    TowerDefense.renderer.shadowMapSoft = true;

    TowerDefense.renderer.shadowCameraNear = 3;
    TowerDefense.renderer.shadowCameraFar = TowerDefense.camera.far;
    TowerDefense.renderer.shadowCameraFov = 50;

    TowerDefense.renderer.shadowMapBias = 0.0039;
    TowerDefense.renderer.shadowMapDarkness = 0.5;
    TowerDefense.renderer.shadowMapWidth = 1024;
    TowerDefense.renderer.shadowMapHeight = 1024;

    TowerDefense.projector = new THREE.Projector();
    cancelAnimationFrame(gameRender);
    $('#game').innerHTML = '';

    new TowerDefense.Level1().start();
}

/**
 * Temporary function to add an enemy in the scene.
 */
function spawnEnemy(type) {
    if (type != null && type == 'ufo') {
        var enemy = new TowerDefense.UfoEnemy();
    }
    else {
        var enemy = new TowerDefense.BasicEnemy();
    }
    enemy.create();
    enemy.add();
    enemy.object.position.x = TowerDefense.startTile.object.position.x;
    enemy.object.position.y = TowerDefense.startTile.object.position.y;
    TowerDefense.scene.add(enemy.object);
    enemy.setPath();
}

init();