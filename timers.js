var Timers = (function() {

  var timers = {};
  var currId = 0;


  function start() {
    var id = currId;
    timers[id] = new Date().getTime();
    currId++;
    return id;
  }

  function stop(id) {
    var start = timers[id];
    if (start) {
      return new Date().getTime() - start;
    }
    else {
      throw "Invalid timer";
    }
  }

  return {
    start: start,
    stop: stop
  };

}());

