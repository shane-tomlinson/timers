
var Timers = require("../timers");
var assert = require("assert");

// quick set of tests to make sure that the
// functions are available in CommonJS modules.
assert.ok(Timers.start);
assert.ok(Timers.stop);
assert.ok(Timers.getResults);



