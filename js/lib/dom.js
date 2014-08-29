/**
 * IE 5.5+, Firefox, Opera, Chrome, Safari XHR object
 *
 * @param string url
 * @param object callback
 * @param mixed data
 * @param string responseType type of the request, e.g. text or arraybuffer
 */
function ajax(url, callback, data, responseType) {
    var x;
    if (responseType == null) {
        responseType = 'text';
    }
    try {
        x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url, 1);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.responseType = responseType;
        x.onreadystatechange = function () {
            if (x.readyState == 4 && (x.status == 200 || x.status == 0)) {
                callback(x.response, x);
            }
        };
        x.send(data)
    } catch (e) {
        window.console && console.log(e);
    }
};

/**
 * Simplest dom selector. Return one (ore multiple) dom elements. id suppose to be one
 * dom element while class selector return an array with dom elements.
 * @param a
 * @param b
 * @returns {*} DOM element
 * @example $('.class-name'); | $('#element-id');
 */
var $ = function(
  a, // take a simple selector like "name", "#name", or ".name", and
  b // an optional context, and
  ){
    a = a.match(/^(\W)?(.*)/); // split the selector into name and symbol.
    return( // return an element or list, from within the scope of
      b // the passed context
        || document // or document,
      )[
      "getElement" + ( // obtained by the appropriate method calculated by
        a[1]
          ? a[1] == "#"
          ? "ById" // the node by ID,
          : "sByClassName" // the nodes by class name, or
          : "sByTagName" // the nodes by tag name,
        )
      ](
        a[2] // called with the name.
      )
}

/**
 * Allows removing of an dom element by simple calling .remove();
 */
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}