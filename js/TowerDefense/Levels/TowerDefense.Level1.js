TowerDefense.Level1 = function () {

    TowerDefense.Level.call( this );

    this.waves[0] = {
        callback: function() {
            var interval = setInterval(spawnEnemy, 500);
            setTimeout(function() { clearInterval(interval); }, 3000);
        }
    };
    this.waves[1] = {
        callback: function() {
            var interval = setInterval(spawnEnemy, 500);
            setTimeout(function() { clearInterval(interval); }, 3000);
        }
    };

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
        },
        {
            'key': 'ghost',
            'file': 'assets/enemies/ghost.obj'
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
            'key': 'bullet-02',
            'file': 'assets/towers/bullet-02.png'
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
        },
        {
            'key': 'smoke-40-128',
            'file': 'assets/towers/smoke_1_40_128_corrected.png'
        },
        {
            'key': 'smoke-particle',
            'file': 'assets/towers/smoke-particle.png'
        },
        {
            'key': 'ghost',
            'file': 'assets/enemies/ghost.png'
        },
        {
            'key': 'blood-128',
            'file': 'assets/enemies/blood-128.png'
        }
    ];

}

TowerDefense.Level1.prototype = Object.create( TowerDefense.Level.prototype );