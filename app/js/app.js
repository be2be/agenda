Em.ENV.VIEW_PRESERVES_CONTEXT = true;

Ag = Em.Application.create();

Ag.ApplicationController = Ember.Controller.extend();
Ag.LoginController = Em.Controller.extend();
Ag.MainController = Em.Controller.extend();

Ag.ProjectsController = Em.Controller.extend();


Ag.ApplicationView = Em.View.extend({
  templateName: 'app'
});

Ag.LoginView = Em.View.extend({
  templateName: 'login'
});

Ag.MainView = Em.View.extend({
  templateName: 'main',
  inboxActive: false,
  nextActive: false,
  starredActive: false,
  scheduledActive: false,
  somedayActive: false,
  archivedActive: false,
  trashActive: false
});

Em.State.reopen({
  enter: function(router) {
    console.debug("state transition: --> " + this.get('name'));
  },

  exit: function(router) {
    console.debug("state transition: " + this.get('name') + " -->");
  }
});

Ag.Router = Em.Router.extend({

  root: Ember.State.extend({

    index: Ember.State.extend({
      route: '/',
      redirectsTo:'loggedOut',

    }),

    loggedOut: Ember.State.extend({

      route: '/login',

      login: function() {
        Ag.stateManager.transitionTo('loggedIn.inbox');
      },

      connectOutlets: function(router, context) {
        var applicationController = router.get('applicationController');
        applicationController.connectOutlet('app', Ag.LoginView);
      }
    }),

    loggedIn: Ember.State.extend({

      route: '/in',

      logout: function(router, event) {
        router.transitionTo('root.loggedOut');
      },

      inbox: Ember.State.extend({
        route: '/inbox',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'app', Ag.MainView);
        },
        enter: function(router) {
          this._super();
          router.get('mainController').set('inboxActive', true);
        },
        exit: function(router) {
          this._super();
          router.get('mainController').set('inboxActive', false);
        }
      }),

      next: Ember.State.extend({
        route: '/next',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'app', Ag.MainView);
        },
        enter: function(router) {
          this._super();
          router.get('mainController').set('nextActive', true);
        },
        exit: function(router) {
          this._super();
          router.get('mainController').set('nextActive', false);
        }
      }),

      starred: Ember.State.extend({
        route: '/starred',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'app', Ag.MainView);
        },
        enter: function(router) {
          this._super();
          router.get('mainController').set('starredActive', true);
        },
        exit: function(router) {
          this._super();
          router.get('mainController').set('starredActive', false);
        }
      }),

      scheduled: Ember.State.extend({
        route: '/scheduled',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'app', Ag.MainView);
        },
        enter: function(router) {
          this._super();
          router.get('mainController').set('scheduledActive', true);
        },
        exit: function(router) {
          this._super();
          router.get('mainController').set('scheduledActive', false);
        }
      }),

      someday: Ember.State.extend({
        route: '/someday',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'app', Ag.MainView);
        },
        enter: function(router) {
          this._super();
          router.get('mainController').set('somedayActive', true);
        },
        exit: function(router) {
          this._super();
          router.get('mainController').set('somedayActive', false);
        }
      }),

      archived: Ember.State.extend({
        route: '/archived',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'app', Ag.MainView);
        },
        enter: function(router) {
          this._super();
          router.get('mainController').set('archivedActive', true);
        },
        exit: function(router) {
          this._super();
          router.get('mainController').set('archivedActive', false);
        }
      }),

      trash: Ember.State.extend({
        route: '/trash',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'app', Ag.MainView);
        },
        enter: function(router) {
          this._super();
          router.get('mainController').set('trashActive', true);
        },
        exit: function(router) {
          this._super();
          router.get('mainController').set('trashActive', false);
        }
      })
    })

  })
});

Ag.initialize();
