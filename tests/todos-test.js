module("todos");

test("todos.js loaded", function() {
  expect(1);
  ok(Ag.Todos, "Ag.Todos does not exist.");
});

test("Create Todo", function() {
  expect(2);

  var todo = Ag.Todos.Todo.create();
  ok(todo.get('id'), "No ID was generated.");

  var todo1 = Ag.Todos.Todo.create();
  var todo2 = Ag.Todos.Todo.create();
  notEqual(todo1.get('id'), todo2.get('id'), "Generated IDs are not unique.");

});

test("Set status of Todo", function() {
  expect(3);

  var todo = Ag.Todos.Todo.create();
  equal(todo.get('status'), Ag.Todos.NEXT, "Initial status should be 'next'.");

  raises(function() {
    todo.set('status', 'abc');
  }, "Throw error for wrong status.");

  todo = Ag.Todos.Todo.create();
  todo.set('status', Ag.Todos.WAITING);
  equal(todo.get('status'), Ag.Todos.WAITING, "Should return status that was set before.");

});

test("Todo: startOn and status", function() {
  expect(6);

  var date = new Date();

  var todo = Ag.Todos.Todo.create();
  todo.set('status', date);
  equal(todo.get('status'), Ag.Todos.SCHEDULED, "Status set to SCHEDULED.");
  equal(todo.get('startOn'), date, "Date set to correct date.");
  todo.set('status', Ag.Todos.NEXT);
  equal(todo.get('startOn'), undefined, "Date reset.");

  var todo = Ag.Todos.Todo.create();
  todo.set('startOn', date);
  equal(todo.get('status'), Ag.Todos.SCHEDULED, "Status set to SCHEDULED.");
  equal(todo.get('startOn'), date, "Date set to correct date.");
  todo.set('startOn', undefined);
  equal(todo.get('status'), Ag.Todos.NEXT, "Status reset.");
});
