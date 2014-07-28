var scene, camera, renderer, projector;

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
    projector = new THREE.Projector();
    $('#game').style.marginLeft = -(TowerDefense.gameWidth / 2) + 'px';
    $('#game').style.marginTop = -(TowerDefense.gameHeight / 2) + 'px';
    $('#game').appendChild( renderer.domElement );
    $('#menu-container').style.display = 'none';
    level1();
    render();

}

/**
 * Creates level 1
 */
function level1() {
    var sizeX = 10;
    var sizeY = 10;
    for (var i = 0; i <= sizeX; i++ ) {
        for (var j = 0; j <= sizeY; j++) {
            if (i == 0 && j == 0) {
                var tile = new TowerDefense.StartTile();
            }
            else if (i == sizeX && j == sizeY) {
                var tile = new TowerDefense.EndTile();
            }
            else {
                var tile = new TowerDefense.BasicTile();
            }
            var mesh = tile.create();
            var positionX = -(sizeX / 2) + (i * 1);
            var positionY = -(sizeY / 2) + (j * 1);
            mesh.position.x = positionX;
            mesh.position.y = positionY;
            scene.add(mesh);
        }
    }
}

function showMenu() {

    $('#menu').innerHTML += '<a href="#game" onclick="newGame();">Play game</a>';

}

init();