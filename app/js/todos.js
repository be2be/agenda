Ag.Todos = Em.Namespace.create({
  NEXT: 0, ACTIVE: 0,
  WAITING: 1,
  SOMEDAY: 2,
  DONE: 3,
  TRASH: 4,
  SCHEDULED: 5
});

Ag.Todos.Todo = Em.Object.extend({

  id: undefined,
  title: "",
  notes: undefined,
  starred: false,

  startOn: undefined,
  dueOn: undefined,

  init: function() {
    this._super();
    this.set('id', Ag.Util.generateId());
    this.set('status', Ag.Todos.NEXT);
  },

  status: (function() {
    var status;
    return function(key, value) {

      if (this.get('startOn')) {
        status = Ag.Todos.SCHEDULED;
      } else if (status === Ag.Todos.SCHEDULED) {
        status = Ag.Todos.NEXT;
      }

      // getter
      if (arguments.length === 1) {
        return status;
      }

      // setter
      if (value === Ag.Todos.NEXT || value === Ag.Todos.WAITING ||
        value === Ag.Todos.SOMEDAY || value === Ag.Todos.DONE ||
        value === Ag.Todos.TRASH) {
        status = value;
        this.set('startOn', undefined);
      } else if(value instanceof Date) {
        status = Ag.Todos.SCHEDULED;
        this.set('startOn', value);
      } else {
        throw new Error(value + " not allowed as status.");
      }
      return status;
    }.property('startOn');
  })()
});

Ag.Todos.Task = Ag.Todos.Todo.extend({
  context: undefined
});
