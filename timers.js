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
      var varianceSquared = 0;

      // find the total variance squared
      for(var i = 0, timerId; timerId = set[i]; ++i) {
        var timer = timers[timerId];

        if (timer.elapsed) {
          var deviation = timer.elapsed - average;
          varianceSquared += Math.pow(deviation, 2);
        }
      }

      var stdDeviation = 0;

      if (!incomplete && complete) {
        // Standard standard deviation formula
        stdDeviation = Math.sqrt(varianceSquared / complete);
      }
      else if(incomplete && complete) {
        // Use Bessel's correction for sample data
        stdDeviation = Math.sqrt(varianceSquared / (complete - 1));
      }

      var results = {
        length: set.length,
        elapsed: elapsed,
        complete: complete,
        incomplete: incomplete,
        average: average,
        stdDeviation: stdDeviation
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

