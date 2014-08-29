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

    constructor: TowerDefense.Element,

    add: function () {

        TowerDefense.__addObject(this);

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