Ag = Em.Application.create();

Ag.Util = Em.Namespace.create();

Ag.Util.generateId = (function() {
  var i = 0;
  return function(prefix) {
    var ret;
    if (prefix) {
      ret = prefix + ":" + Date.now() + ":" + i++;
    } else {
      ret = Date.now() + ":" + i++;
    }
    return ret;
  };
})();
