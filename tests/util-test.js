module("util");

test("ember loaded", function() {
  expect(1);
  ok(Ember, "ember.js has not been loaded.");
});

test("util.js loaded", function() {
  expect(2);
  ok(Ag, "Ag does not exist.");
  ok(Ag.Util, "Ag.Util does not exist.");
});

test("generateId()", function() {
  expect(3);

  var id1 = Ag.Util.generateId();
  var id2 = Ag.Util.generateId();
  notEqual(id1, id2, "Generated IDs are not unique.");

  var id = Ag.Util.generateId();
  ok(/^\d+:\d+$/.test(id), "Generated IDs do not match the expected pattern.");

  var id = Ag.Util.generateId("prefix");
  ok(/^prefix:\d+:\d+$/.test(id), "Generated IDs do not match the expected pattern.");
});
