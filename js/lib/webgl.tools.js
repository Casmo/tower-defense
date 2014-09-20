function handleWebGlErrors(canvasElement, errorCallback) {
    if (canvasElement == null) {
        return;
    }
    if (typeof errorCallback != 'function') {
        errorCallback = function(event) { console.log('WebGL context lost.', event); event.preventDefault(); };
    }
    canvasElement.addEventListener(
      "webglcontextlost", errorCallback, false);
//    canvasElement.addEventListener(
//      "webglcontextrestored", handleContextRestored, false);

}