# How to contribute
Bla bla bla fork bla bla pull request bla bla amazing.

## Code structure
The Tower Defense is build with the following structure in mind:

    application.js (start, glues and creates TowerDefense thingy)

    TowerDefense
        |
        +- Worker.PathFinder (Used for making a* algorithm calculations through WebWorker)
        |
        +- TowerDefense.Ui (Holds the interaction between game and interface)
        |
        +- TowerDefense.Element (Holds all basic information that applies for every object)
            |
            +- TowerDefense.Tower
            |   |
            |   - TowerDefense.BasicTower
            |   - TowerDefense.AdvancedTower
            |   - TowerDefense.BadAssTower
            |   - *new tower*
            |
            +- TowerDefense.Enemy
            |   |
            |   - TowerDefense.BasicEnemy
            |   - TowerDefense.UfoEnemy
            |   - TowerDefense.DummyEnemy (fast speed unit that cannot be attacked)
            |   - *new enemy*
            |
            +- TowerDefense.Bullet
            |   |
            |   - *new bullet*
            |
            + TowerDefense.Tile
            |   |
            |   - TowerDefense.BasicTile (Only selectable tile for building towers yet)
            |   - TowerDefense.DecoTile (Only the underground tile for decoration)
            |   - TowerDefense.StartTile (Normal tile where units will spawn)
            |   - TowerDefense.EndTile (Normal tile where units will move to and despawn)