/* UiRouter specific part */
Herokit.Router.UiRouter = {
    type: "UiRouter",
    applyOnBefore: function(hkRouterRule) {
        if (hkRouterRule.type !== this.type)
        {
            throw new Herokit.Error("Invalid Router Rule type '" + hkRouterRule.type+ "'. Expected IronRouter.");
        }
        try{
            //now calling the real iron router itself and attaching the rule
            //return Router.onBeforeAction(function(){hkRouterRule.data(this);}, hkRouterRule.options);
            //
            // @ THIS IS TODO - maybe with lib https://github.com/interval-braining/angular-ui-router-hooks-before-state
        }
        catch(e)
        {
         throw e;
        }
    },
    addState: function(name, data) {
        if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Router.UiRouter.addState "+name);
        check(name, String);
        check(data, Match.ObjectIncluding({_hkrouter: Match.Optional(String)}));

        Herokit.Behavior.States[name]=data;
        Herokit.Behavior.States[name]._hkrouter = this.type;

        return Herokit.Behavior.States[name];
    },
    setupStates: function() {
        if (!Meteor.isClient) return false; //NG UI Router only client, not server

        if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Router.UiRouter.setupStates");


        angular.module(Herokit.Config.ngAppName).config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$stickyStateProvider',
          function ($urlRouterProvider, $stateProvider, $locationProvider, $stickyStateProvider) {
              Herokit.Helper.debug.log("ngHerokit.config routes", 5);

              $locationProvider.html5Mode(true);
              //$stickyStateProvider.enableDebug(true);

              //add Routes
                _.each(Herokit.Router.getStates(), function(element, index, list){
                    if (element._hkrouter === "UiRouter") {
                        Herokit.Router.UiRouter.appendStateResolves(index);

                        Herokit.Helper.debug.log("Setup new $stateProvider.state for "+index, 5);
                        $stateProvider.state(index, element);
                    }

                });

              $urlRouterProvider.otherwise("/404"); //@TODO OTHERWISE CASE e.g. 404 Page

        }]);

    },
    appendStateResolves: function(statename) {
        if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Router.UiRouter.appendStateResolves for "+statename);
        if (!Meteor.isClient) throw new Herokit.Error("Only allowed in client");

        var state = Herokit.Router.getState(statename);
        if (typeof state.resolve === 'undefined') state.resolve={};

        state.resolve['herokitData'] = ["$meteor", function($meteor){
                var herokitData={};

                _.each(this.data , function(element, collectionName, list){
                    if (typeof element.subOptions === 'undefined') element.subOptions={};

                    if (typeof element.subscription !== 'undefined') {
                        herokitData[collectionName] = $meteor.collection(Herokit.Data[collectionName]).subscribe(element.subscription, element.subOptions);
                    }
                    else {
                        herokitData[collectionName] = $meteor.collection(Herokit.Data[collectionName]);
                    }

                });

                return herokitData;
            }];

    }
};

//Register IronRouter as available Router
Herokit.Env.Routing.availableRouters.push("UiRouter");
