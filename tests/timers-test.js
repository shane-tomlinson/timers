(function() {
  module("timers");

  var timers = Timers;

  test("start", function() {
    var id = timers.start();
    equal(typeof id, "number", "start successful, we have an id");

    var id2 = timers.start();
    equal(typeof id, "number", "start successful, we have a second id");

    notEqual(id, id2, "The two ids are not equal");
  });

  test("stop with valid timer", function() {
    var id = timers.start();
    var elapsed = timers.stop(id);

    equal(typeof elapsed, "number", "elapsed time is a number");
    ok(0 <= elapsed && elapsed < 100, "elapsed time is > 0");
  });

  test("stop after async timeout", function() {
    var id = timers.start();

    setTimeout(function() {
      var elapsed = timers.stop(id);

      // allow for timers firing slightly early
      ok(elapsed > 990, "elapsed time is around what we figured");
      start();
    }, 1000);

    stop();
  });

  test("stop with invalid timer", function() {
    var id = timers.start();
    raises(function() {
      timers.stop("a");
    }, "Invalid timer", "stop with invalid timer");
  });

  test("start with set, one timer", function() {
    var id = timers.start("set");

    var results = timers.getResults("set");
    equal(results.length, 1, "there is one timer in the set");
    equal(results.complete, 0, "none are yet complete");
    equal(results.incomplete, 1, "one test is incomplete");
    equal(results.elapsed, 0, "no tests have finished, elapsed is still 0");
    equal(results.average, 0, "no tests have finished, no average");
    equal(results.stdDeviation, 0, "no tests have finished, no standard deviation");

    setTimeout(function() {
      timers.stop(id);

      var results = timers.getResults("set");
      equal(results.length, 1, "there is one timer in the set");
      equal(results.complete, 1, "the one test has completed");
      equal(results.incomplete, 0, "none are incomplete");
      ok(results.elapsed >= 500, "has some time elapsed?");
      equal(results.average, results.elapsed, "one test finished, elapsed and average are the same");
      equal(results.stdDeviation, 0, "one result, no standard deviation");

      start();
    }, 500);

    stop();

  });

test("start with set, multiple timers", function() {
  var id = timers.start("set2");
  var id2 = timers.start("set2");
  var id3 = timers.start("set2");

  setTimeout(function() {
    timers.stop(id);
    var results = timers.getResults("set2");
    equal(results.length, 3, "there are two timers in the set");
    equal(results.complete, 1, "one test has completed");
    equal(results.incomplete, 2, "one is incomplete");
  }, 500);

  setTimeout(function() {
    timers.stop(id2);

    var results = timers.getResults("set2");

    console.log("elapsed: " + results.elapsed);
    ok(results.elapsed >= 1500, "has some time elapsed?");

    console.log("average: " + results.average);
    ok(results.average >= 750 , "average >= 750");

    console.log("stdDeviation: " + results.stdDeviation);
    ok(results.stdDeviation >= 100, "standard deviation");

  }, 1000);

  setTimeout(function() {
    timers.stop(id3);

    var results = timers.getResults("set2");
    equal(results.length, 3, "there is one timer in the set");
    equal(results.complete, 3, "the one test has completed");
    equal(results.incomplete, 0, "none are incomplete");

    console.log("elapsed: " + results.elapsed);
    ok(results.elapsed >= 1500, "has some time elapsed?");

    console.log("average: " + results.average);
    ok(results.average >= 1500 , "average >= 750");

    console.log("stdDeviation: " + results.stdDeviation);
    ok(results.stdDeviation >= 1000, "standard deviation");

    start();

  }, 3000);

  stop();

});


}());
