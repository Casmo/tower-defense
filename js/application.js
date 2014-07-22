var scene, camera, renderer;

function render() {

    requestAnimationFrame(render, null);
    TowerDefense.update();
    renderer.render(scene, camera);

}

function init() {

    showMenu();

}

function newGame() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, TowerDefense.gameWidth / TowerDefense.gameHeight, 0.1, 1000 );
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( TowerDefense.gameWidth, TowerDefense.gameHeight );
    $('#game').style.marginLeft = -(TowerDefense.gameWidth / 2) + 'px';
    $('#game').style.marginTop = -(TowerDefense.gameHeight / 2) + 'px';
    $('#game').appendChild( renderer.domElement );
    $('#menu-container').style.display = 'none';
    level1();
    render();

}

// Temporary function
function level1() {
    for (var i = 0; i < 50; i++ ) {
        var tile = new TowerDefense.Tower();
        var mesh = tile.create();
        mesh.position.x = i * 1.1;
        mesh.position.z = i * 1.1;
        scene.add(mesh);
    }
}

function showMenu() {

    $('#menu').innerHTML += '<a href="#game" onclick="newGame();">Play game</a>';

}

init();