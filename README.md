#Performance Timers for Javascript
I wrote this to be a lightweight alternative to using the profiler that comes
with many web browsers.  This allows you to set timers, and create "sets" of
timers where you can gather collective statistics such as total elapsed time,
the average elapsed time, and standard deviation.

This can be used in either the browser or as a CommonJS module (i.e.
NodeJS).

##Usage

    // Start a timer that is not a member of a set
    var id = Timers.start();

    // Stop the timer
    var elapsed = Timers.stop(id);

    // Start two timers that are members of a set called "set"
    var id = Timers.start("set");
    var id2 = Timers.start("set");

    // Not all timers need to be stopped to get the set results.
    Timers.stop(id);
    Timers.stop(id2);

    // Get the total results.  Result fields are:
    //   - length - the number of tests in the set
    //   - elapsed - the total amount of time that has elapsed for all complete timers
    //   - complete - number of timers that have been 'stopped'
    //   - incomplete - number of timers that have not yet been 'stopped'
    //   - average - average amount of time it took the stopped timers to complete
    //   - stdDeviation - standard deviation of the stopped timers
    var results = Timers.getResults("set");

##Contact Info
* Shane Tomlinson
* set117@yahoo.com
* stomlinson@mozilla.com
* @shane_tomlinson
* http://www.shanetomlinson.com

##License
This software is available under your choice of the following licenses:

  * MPL 1.1 or later: http://www.mozilla.org/MPL/
  * GPL 2.0 or later: http://www.gnu.org/licenses/gpl.html
  * LGPL 2.1 or later: http://www.gnu.org/licenses/lgpl.html

