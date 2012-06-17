Ag.Todos = Em.Namespace.create();

Ag.Todos.Todo = Em.Object.extend({
  init: function() {
    this._super();
    this.set('id', Ag.Util.generateId());
  }
});
