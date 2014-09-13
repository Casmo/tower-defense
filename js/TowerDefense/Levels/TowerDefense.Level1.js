TowerDefense.Level1 = function () {

    TowerDefense.Level.call( this );

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