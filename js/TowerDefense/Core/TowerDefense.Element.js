/**
 * Basic method that apply to all objects will be placed here.
 * @constructor
 */
TowerDefense.Element = function () {

    /**
     * The unique id of the object
     */
    this.id = TowerDefense.elementCount++;

    /**
     * Type of the current object. e.g. TOWER or ENEMY. Can be used to handle special
     * actions.
     * @type {string}
     */
    this.type = '';

    this.rotation = {x: 0, y: 0, z: 0 };
    this.position = { x: 0, y: 0, z: 0 };
    this.size = {x: 1, y: 1, z: 1 };

    this.material = {};
    this.geometry = {};
    this.meshTexture = ''; // Key with the texture. @see TowerDefense.meshTextures
    this.meshObject = ''; // Key with object. @see TowerDefense.meshObjects

    /**
     * Holds the 3D (Three) mesh
     */
    this.object = {};

    /**
     * Whether this object is selected or not
     * @type {boolean}
     */
    this.selected = false;

    /**
     * Whether the current object is selectable
     * @type {boolean}
     */
    this.selectable = false;

    /**
     * Holds the tween for animation
     * @type {{}}
     */
    this.tween = {};

}

TowerDefense.Element.prototype = {

    /**
     * Creates the three.js mesh with this.material and this.geometry.
     */
    create: function() {

        if (this.meshObject != null && this.meshObject != '') {
            var refObject = TowerDefense.meshObjects[this.meshObject];
            this.geometry = refObject.object.geometry;
        }
        if (this.meshTexture != null && this.meshTexture != '') {
            var refObject = TowerDefense.meshTextures[this.meshTexture];
            this.material = new THREE.MeshLambertMaterial(
              {
                  map: refObject.texture
              }
            );

        }

        this.object = new THREE.Mesh( this.geometry, this.material );
        this.object.rotation.x = this.rotation.x;
        this.object.rotation.y = this.rotation.y;
        this.object.rotation.z = this.rotation.z;
        this.object.position.x = this.position.x;
        this.object.position.y = this.position.y;
        this.object.position.z = this.position.z;
        this.object.scale.x = this.size.x;
        this.object.scale.y = this.size.y;
        this.object.scale.z = this.size.z;
        this.object.receiveShadow = true;
        this.object.castShadow = true;
        return this.object;

    },

    /**
     * Spawn the object into the game.
     */
    spawn: function() {

    },

    add: function () {

        return TowerDefense.__addObject(this);

    },

    remove: function () {

        TowerDefense.__removeObject(this);

    },

    update: function() {

    },

    /**
     * Logical callback after user clicked on this object
     */
    select: function() {

    },

    /**
     * Logical callback after object is deselected
     */
    deselect: function() {

    }

}

TowerDefense.elementCount = 0;


/**
 * @todo Some enemy Objects remove the tweens from other enemies/objects. Fix!
 */
TowerDefense.Element.prototype.removeTween = function() {

    TWEEN.remove(this.tween);

}