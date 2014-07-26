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
     * Holds the 3D (Three) mesh
     */
    this.object = {};

    /**
     * Current object is selected
     * @type {boolean}
     */
    this.selected = false;

}

TowerDefense.Element.prototype = {

    constructor: TowerDefense.Element,

    add: function () {

        TowerDefense.__addObject(this);

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