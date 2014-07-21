var TowerDefense = new TowerDefense();

function render() {

    requestAnimationFrame(render, null);
    TowerDefense.update();

}

function init() {

    showMenu();

}

function newGame() {

    TowerDefense.newGame();
    render();
    $('#menu-container').style.display = 'none';

}

function showMenu() {

    $('#menu').innerHTML += '<a href="#game" onclick="newGame();">Play game</a>';

}

init();