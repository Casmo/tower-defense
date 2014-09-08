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
        },
        {
            'key': 'ufo',
            'file': 'assets/enemies/ufo.obj'
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
            'file': 'assets/levels/level-01_COLOR.png'
        },
        {
            'key': 'level-01-disp',
            'file': 'assets/levels/level-01_DISP.png'
        },
        {
            'key': 'level-01-nrm',
            'file': 'assets/levels/level-01_NRM.png'
        },
        {
            'key': 'level-01-occ',
            'file': 'assets/levels/level-01_OCC.png'
        },
        {
            'key': 'level-01-spec',
            'file': 'assets/levels/level-01_SPEC.png'
        },
        {
            'key': 'ufo-yellow',
            'file': 'assets/enemies/ufo-yellow.jpg'
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
            tile.create();
            tile.add();
            var positionX = -(sizeX * tile.squareSize / 2) + (i * Math.round(tile.squareSize));
            var positionY = -(sizeY * tile.squareSize / 2) + (j * Math.round(tile.squareSize));
            tile.object.position.x = positionX;
            tile.object.position.y = positionY;
            TowerDefense.scene.add(tile.object);
        }
    }

    var decoTile = new TowerDefense.DecoTile();
    decoTile.create();
    decoTile.object.position.z = -.6;
    decoTile.add();
    TowerDefense.scene.add(decoTile.object);
//    var sunGeometry = new THREE.SphereGeometry (10, 20, 20);
//    var sunMaterial = new THREE.MeshBasicMaterial ({color: 0xffff00 });
//    var sunMesh = new THREE.Mesh (sunGeometry, sunMaterial );
//    var sunLight = new THREE.SpotLight (0xffffea, 1);
//    sunMesh.add(sunLight);
//    sunMesh.position.y = 300;
//    sunMesh.position.z = 100;
//    TowerDefense.scene.add(sunMesh);

    var hemiLight = new THREE.HemisphereLight( 0xf3fdff, 0xf7fff3, 0.6); // sky, ground, intensity
    hemiLight.position.set( 0, 0, 50 );
    TowerDefense.scene.add( hemiLight );

    var dirLight = new THREE.DirectionalLight( 0xffffff,.7 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1.1,1, 1.4 );
    dirLight.position.multiplyScalar( 60 );

    if (TowerDefense.settings.advancedLight == true) {
        dirLight.castShadow = true;
        dirLight.shadowMapWidth = 512;
        dirLight.shadowMapHeight = 512;
        var d = 60;
        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;
        dirLight.shadowCameraFar = 250;
        dirLight.shadowBias = -0.0001;
        dirLight.shadowDarkness = 0.35;
        dirLight.shadowCameraFov = 120;
    }

    if (TowerDefense.settings.debug == true) {
        dirLight.shadowCameraVisible = true;
    }

    TowerDefense.scene.add( dirLight );

    spawnDummy();

}

function spawnDummy() {
    return;
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