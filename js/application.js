var gameRender;

function render() {

    gameRender = requestAnimationFrame(render, null);
    TowerDefense.update();
    TowerDefense.renderer.render(TowerDefense.scene, TowerDefense.camera);

}

TowerDefense.initialize();

function newGame() {

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