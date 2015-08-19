/* Iron Router specific part */
Herokit.Router.IronRouter = {
    type: "IronRouter",
    FALLBACKCATCHALLNAME: '__FALLBACKCATCHALL',
    applyOnBefore: function(hkRouterRule) {
        if (hkRouterRule.type !== this.type)
        {
            throw new Herokit.Error("Invalid Router Rule type '" + hkRouterRule.type+ "'. Expected IronRouter.");
        }
        try{
            //now calling the real iron router itself and attaching the rule
            if (Herokit.Helper.debug.isLog(5)) console.log("Setting up OnBeforeAction:", hkRouterRule);
            return Router.onBeforeAction(function(){ hkRouterRule.data(this);}, hkRouterRule.options);
        }
        catch(e)
        {
         throw e;
        }
    },
    setupStates: function() {
        if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Router.IronRouter.setupStates");

        _.each(Herokit.Router.getStates(), function(element, index, list){
            if (element._hkrouter === "IronRouter") {
                Herokit.Helper.debug.log("Setup new IronRouter Route state for "+index, 5);

                if (typeof element.autosetup==='undefined' || element.autosetup===true)
                {
                    if (index!==Herokit.Router.IronRouter.FALLBACKCATCHALLNAME)
                        Herokit.Router.IronRouter._setupIronRoute(index, element);
                }
            }
        });

        var defaultNgAppRoute = Herokit.Router.getState(Herokit.Router.IronRouter.FALLBACKCATCHALLNAME);
        if (typeof defaultNgAppRoute==='undefined') throw new Herokit.Error(Herokit.Router.IronRouter.FALLBACKCATCHALLNAME+" (Fallback Catchall) Route undefined!");

        Herokit.Router.IronRouter._setupIronRoute(Herokit.Router.IronRouter.FALLBACKCATCHALLNAME , defaultNgAppRoute);
        Herokit.Helper.debug.log("Setup IronRouter FALLBACKCATCHALL "+Herokit.Router.IronRouter.FALLBACKCATCHALLNAME, 5);

    },
    _setupIronRoute: function(name, options) {
        if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Router.IronRouter._setupIronRoute "+name);

       Router.route(options.url, {
                        name: name,
                        path: options.url,
                        action: function() {
                            options.data(this); //call IronRouter Function with this as RouteContext Param
                        }
                    }
       );
    },
    addState: function(name, path, data, autosetup) {
        if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Router.IronRouter.addState "+name);
        check(name, String);
        check(path, String);
        check(data, Match.Any);    //should be the router function

        Herokit.Behavior.States[name]={
            url: path,
            data: data,
            autosetup: (typeof autosetup !== 'undefined' ? autosetup : true )
        };
        Herokit.Behavior.States[name]._hkrouter = this.type;

        return Herokit.Behavior.States[name];
    }
};

//Register IronRouter as available Router
Herokit.Env.Routing.availableRouters.push("IronRouter");
