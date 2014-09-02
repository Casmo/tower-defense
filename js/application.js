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
    preloadLevel1(
      function() {
          level1();
          $('#game').appendChild( TowerDefense.renderer.domElement );
          render();
          TowerDefense.Ui.initializeControls(TowerDefense.camera);
      }
    );
}

/**
 * Preloads all objects for level 1
 * @param callback function
 * @todo make it more OO
 */
function preloadLevel1(callback) {

    TowerDefense.meshObjects = [
        {
            'key': 'tower-01',
            'file': 'assets/towers/tower-01.obj'
        },
        {
            'key': 'tower-02',
            'file': 'assets/towers/tower-02.obj'
        },
        {
            'key': 'tower-03',
            'file': 'assets/towers/tower-03.obj'
        }
    ];
    TowerDefense.meshTextures = [
        {
            'key': 'tower-01',
            'file': 'assets/towers/tower-01.jpg'
        },
        {
            'key': 'tower-02',
            'file': 'assets/towers/tower-02.jpg'
        },
        {
            'key': 'tower-03',
            'file': 'assets/towers/tower-03.jpg'
        },
        {
            'key': 'level-01',
            'file': 'assets/levels/level-01.jpg'
        }
    ];
    TowerDefense.loadObjects(callback);

}

/**
 * Creates level 1
 * @todo make it OO
 */
function level1() {
    var sizeX = 10;
    var sizeY = 10;
    for (var i = 0; i <= sizeX; i++ ) {
        var x = i;
        TowerDefense.grid[x] = [];
        TowerDefense.gridPath[x] = [];
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
            TowerDefense.gridPath[x][y] = tile.open;
            var mesh = tile.create();
            var positionX = -(sizeX * tile.squareSize / 2) + (i * Math.round(tile.squareSize));
            var positionY = -(sizeY * tile.squareSize / 2) + (j * Math.round(tile.squareSize));
            mesh.position.x = positionX;
            mesh.position.y = positionY;
            TowerDefense.scene.add(mesh);
        }
    }

    var decoTile = new TowerDefense.DecoTile();
    var mesh = decoTile.create();
    TowerDefense.scene.add(mesh);
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );
    TowerDefense.scene.add( hemiLight );

    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 50 );
    TowerDefense.scene.add( dirLight );
    spawnDummy();

}

function spawnDummy() {
    var dummyEnemy = new TowerDefense.DummyEnemy();
    var dummyMesh = dummyEnemy.create();
    TowerDefense.scene.add(dummyMesh);
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
    TowerDefense.scene.add(mesh);
    enemy.setPath();
}

init();