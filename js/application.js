var scene, camera, renderer, projector, controls;

function render() {

    requestAnimationFrame(render, null);
    TowerDefense.update();
    renderer.render(scene, camera);

}

function init() {

    TowerDefense.initialize();
    showMenu();

}

function newGame() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, TowerDefense.gameWidth / TowerDefense.gameHeight, 0.1, 1000 );
    camera.position.x = 10;
    camera.position.y = -10;
    camera.position.z = 20;
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(new THREE.Vector3(0,0,0));
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( TowerDefense.gameWidth, TowerDefense.gameHeight );

    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = camera.far;
    renderer.shadowCameraFov = 50;

    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapHeight = 1024;

    projector = new THREE.Projector();
    $('#game').style.marginLeft = -(TowerDefense.gameWidth / 2) + 'px';
    $('#game').style.marginTop = -(TowerDefense.gameHeight / 2) + 'px';
    $('#game').appendChild( renderer.domElement );
    $('#menu-container').style.display = 'none';
    level1();
    render();
    TowerDefense.Ui.initializeControls(camera);

}

/**
 * Creates level 1
 */
function level1() {
    var sizeX = 10;
    var sizeY = 10;
    for (var i = 0; i <= sizeX; i++ ) {
        var x = i;
        TowerDefense.grid[x] = [];
        for (var j = 0; j <= sizeY; j++) {
            if (i == 0 && j == 0) {
                var tile = new TowerDefense.StartTile();
                TowerDefense.startTile = tile;
            }
            else if (i == sizeX && j == sizeY) {
                var tile = new TowerDefense.EndTile();
                TowerDefense.endTile = tile;
            }
            else {
                var tile = new TowerDefense.BasicTile();
            }
            var y = j;
            tile.gridPosition = { x: x, y: y };
            TowerDefense.grid[x][y] = tile;
            var mesh = tile.create();
            var positionX = -(sizeX / 2) + (i * 1);
            var positionY = -(sizeY / 2) + (j * 1);
            mesh.position.x = positionX;
            mesh.position.y = positionY;
            scene.add(mesh);
        }
    }
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight );

    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 50 );
    scene.add( dirLight );

    var dummyEnemy = new TowerDefense.DummyEnemy();
    var dummyMesh = dummyEnemy.create();
    scene.add(dummyMesh);
    dummyMesh.position.x = TowerDefense.startTile.object.position.x;
    dummyMesh.position.y = TowerDefense.startTile.object.position.y;
    dummyEnemy.setPath();
}

/**
 * Temporary function to add an enemy in the scene.
 */
function spawnEnemy() {
    var enemy = new TowerDefense.BasicEnemy();
    var mesh = enemy.create();
    mesh.position.x = TowerDefense.startTile.object.position.x;
    mesh.position.y = TowerDefense.startTile.object.position.y;
    scene.add(mesh);
    enemy.setPath();
}

function showMenu() {

    $('#menu').innerHTML += '<a href="#game" onclick="newGame();">Play game</a>';

}

init();