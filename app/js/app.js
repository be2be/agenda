Em.ENV.VIEW_PRESERVES_CONTEXT = true;

Ag.ApplicationController = Em.Controller.extend();
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

  root: Em.Route.extend({

    index: Em.Route.extend({
      route: '/',
      redirectsTo:'loggedOut',

    }),

    loggedOut: Em.Route.extend({

      route: '/login',

      login: function() {
        Ag.router.transitionTo('loggedIn.inbox');
      },

      connectOutlets: function(router, context) {
        var applicationController = router.get('applicationController');
        applicationController.connectOutlet('login');
      }
    }),

    loggedIn: Em.Route.extend({

      route: '/in',

      logout: function(router, event) {
        router.transitionTo('root.loggedOut');
      },

      inbox: Em.Route.extend({
        route: '/inbox',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'main');
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

      next: Em.Route.extend({
        route: '/next',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'main');
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

      starred: Em.Route.extend({
        route: '/starred',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'main');
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

      scheduled: Em.Route.extend({
        route: '/scheduled',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'main');
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

      someday: Em.Route.extend({
        route: '/someday',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'main');
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

      archived: Em.Route.extend({
        route: '/archived',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'main');
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

      trash: Em.Route.extend({
        route: '/trash',
        connectOutlets: function(router, context) {
          router.get('applicationController').connectOutlet(
            'main');
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
