TowerDefense.Level1 = function () {

    TowerDefense.Level.call( this );

    this.waves[500] = { callback: function() { spawnEnemy(); } };
    this.waves[510] = { callback: function() { spawnEnemy(); } };
    this.waves[520] = { callback: function() { spawnEnemy(); } };
    this.waves[530] = { callback: function() { spawnEnemy(); } };
    this.waves[540] = { callback: function() { spawnEnemy(); } };
    this.waves[550] = { callback: function() { spawnEnemy(); } };
    this.waves[560] = { callback: function() { spawnEnemy(); } };
    this.waves[570] = { callback: function() { spawnEnemy(); } };
    this.waves[580] = { callback: function() { spawnEnemy(); } };
    this.waves[590] = { callback: function() { spawnEnemy(); } };
    this.waves[600] = { callback: function() { spawnEnemy(); } };
    this.waves[610] = { callback: function() { spawnEnemy(); } };
    this.waves[620] = { callback: function() { spawnEnemy(); } };
    this.waves[630] = { callback: function() { spawnEnemy(); } };
    this.waves[640] = { callback: function() { spawnEnemy(); } };
    this.waves[650] = { callback: function() { spawnEnemy(); } };

    this.meshes = [
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
    this.textures = [
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
            'key': 'bullet-01',
            'file': 'assets/towers/bullet-01.png'
        },
        {
            'key': 'level-01',
            'file': 'assets/levels/level-01_COLOR.png'
        },
        {
            'key': 'level-01-nrm',
            'file': 'assets/levels/level-01_NRM.png'
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

}

TowerDefense.Level1.prototype = Object.create( TowerDefense.Level.prototype );