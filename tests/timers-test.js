(function() {
  module("timers");

  var timers = Timers;

  test("start", function() {
    var id = timers.start();
    equal(typeof id, 'number', "start successful, we have an id");

    var id2 = timers.start();
    equal(typeof id, 'number', "start successful, we have a second id");

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


}());
