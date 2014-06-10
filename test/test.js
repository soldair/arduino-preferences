var test = require('tape');
var prefs = require('../');
test("can read prefs",function(t){
  var o = prefs();

  t.ok(o,'should have prefs');
  t.equals(o[0].board,'pinoccio','should have set 0 for first file found');
  t.end();
})
