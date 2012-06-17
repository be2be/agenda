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
