'use strict';

//initialize Herokit as global variable ready for export
Herokit = {
    App: {},    //here is later the ngApp module registred
    Config: {
        ngAppName: 'herokitapp',
        //ngBootstrapElement: 'body',   //optional, default is the id based on ngAppName
        ngModules: ['ngHerokit','angular-meteor','commangular', 'UIRouteConsoleLogger'],
        HeroPacks: {},
        APPCONFIG: {},
        autoinit: true,
        debug: {
            loglevel: 0,
            console: false
        }
    },
    Data: {     //  Datenbanken kommen hier rein
    },
    Env: {              //  Environment kommen hier rein
        _isHerokitSetupReady: false,
        isHerokitReady: false,
        isCordova: Meteor.isCordova,
        isClient: Meteor.isClient,
        isServer: Meteor.isServer,
        Routing: {
            availableRouters: []
        }
    },
    Helper: {},
    Behavior: {
        Queries: {},
        States: {

        },      // Ui.Router States & IronRouter States
        OnBeforeActions: {} // OnBeforeActions for Iron Router
    },
    Design: {
        Provider: "angular-material",
        Theme: {
            Config: {}
        },
        Layouts: {}
    }
};
