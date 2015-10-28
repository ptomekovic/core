'use strict';

//initialize Herokit as global variable ready for export
Herokit = {
    _version: '0.2.5',
    App: {},    //here is later the ngApp module registred
    Config: {
        ngAppName: 'herokitapp',
        //ngBootstrapElement: 'body',   //optional, default is the id based on ngAppName
        ngModules: ['ngHerokit', 'angular-meteor', 'commangular', 'UIRouteConsoleLogger'],
        HeroPacks: {},
        APPCONFIG: {
            DefaultAppTitle: 'Default HeroKIT App Title'
        },
        autoinit: true,
        debug: {
            loglevel: 0,
            console: false
        },
        hkModules: {}
    },
    Compatibility: {
        Features: {}
    },
    Data: {     //  Datenbanken kommen hier rein
        _Storages: {}  //Data Storages
    },
    Env: {              //  Environment kommen hier rein
        _isHerokitSetupReady: false,
        _isHerokitStartingUp: false,
        isHerokitReady: false,
        isCordova: Meteor.isCordova,
        isClient: Meteor.isClient,
        isServer: Meteor.isServer,
        Routing: {
            availableRouters: []
        }
    },
    Models: {
        _instances: {}    //model instances
        //here you can register your model definitions
    },
    Helper: {},
    Behavior: {
        Queries: {},
        States: {},      // Ui.Router States & IronRouter States
        OnBeforeActions: {} // OnBeforeActions for Iron Router
    },
    Design: {
        Provider: "angular-material",
        Theme: {
            Config: {}
        },
        Layouts: {}
    },
    Modules: {}
};

