var Timers = (function() {

  var timers = {};
  var sets = {};
  var currId = 0;


  function start(setId) {
    var id = currId;
    timers[id] = {
      start: new Date().getTime()
    };

    if (setId) {
      var set = sets[setId] = sets[setId] || [];
      set.push(id);
    }
    currId++;
    return id;
  }

  function stop(id) {
    var timer = timers[id];
    if (timer) {
      timer.complete = new Date().getTime();
      timer.elapsed = timer.complete - timer.start;
      return timer.elapsed;
    }
    else {
      throw "Invalid timer";
    }
  }

  function getResults(setId) {
    var set = sets[setId];
    if (set) {
      var elapsed = 0,
          complete = 0,
          incomplete = 0;

      // find the total elapsed time
      for(var i=0, timerId; timerId=set[i]; ++i) {
        var timer = timers[timerId];

        if(timer.elapsed) {
          complete++;
          elapsed += timer.elapsed;
        }
        else {
          incomplete++;
        }
      }

      var average = complete > 0 ? elapsed / complete : 0;
      var totalDeviation = 0;
      var devSquared = 0;
      // find the standard deviation
      for(var i = 0, timerId; timerId = set[i]; ++i) {
        var timer = timers[timerId];

        if (timer.elapsed) {
          var deviation = Math.round(timer.elapsed - average);
          totalDeviation += deviation;
          devSquared += Math.pow(deviation, 2);
        }
      }

      var results = {
        length: set.length,
        elapsed: elapsed,
        complete: complete,
        incomplete: incomplete,
        average: average,
        stdDeviation: complete > 0 ? Math.sqrt(devSquared / complete) : 0
      };

      return results;
    }
    else {
      throw "Invalid set";
    }
  }

  return {
    start: start,
    stop: stop,
    getResults: getResults
  };

}());

