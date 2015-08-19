'use strict';

Herokit.Helper.debug.log("Is Herokit.Config.autoinit? "+(Herokit.Config.autoinit?"yes":"no"), 5);
if (Herokit.Config.autoinit)
{
    //currently IronRouter is required for autoinit
    if (Herokit.Helper.hasRouter("IronRouter"))
    {

        /*Router.plugin('dataNotFound', {notFoundTemplate: Herokit.Config.ngAppName});

        Template[Herokit.Config.ngAppName].onRendered(function () {
            Herokit.init.run(this);   //this = RouteContext
            //setTimeout(function () {Herokit.init.do(); }, 1);
        });*/

        Herokit.Helper.debug.log("Configuring FALLBACKCATCHALLNAME in Autoinit", 5);
        Herokit.Router.IronRouter.addState(Herokit.Router.IronRouter.FALLBACKCATCHALLNAME,  '/(.*)',
            function (RouterContext) {
                if (Herokit.Helper.debug.isLog(5)) console.log(RouterContext);

                return Herokit.init.run(RouterContext);
            },
            false   //no autosetup
        );
        /*
        //catchall route
        Router.route('/(.*)', {
            name: "OTHERWISE",
            onBeforeAction: function(){

                if (Herokit.Helper.debug.isLog(5)) console.log(this);
                var RouterContext = this;
                var bIsDefault=true;
                //Skip if it's an existing IronRouter Route

                _.each(Herokit.Router.getStates(), function(element, index, list){
                    if (element._hkrouter === "IronRouter") {
                        console.log(RouterContext);
                        console.log(element);
                        console.log("COMPARE ROUTES"+element.url+" VS "+RouterContext.params[0]);
                        var regExpMatch = new RegExp(element.url.slice(1).replace(/(\/\:[^\/]+)/gi, "\\/([^/]*)"),"gi");
                        console.log(regExpMatch);

                        console.log("DOES IT MATCH? "+RouterContext.params[0]);
                        if (RouterContext.params[0].search(regExpMatch)!==-1)
                        {
                            bIsDefault=false;
                            console.log(RouterContext);
                            Herokit.Helper.debug.log("Herokit IronRouter CatchAll Route - SKIP due to known Route found in "+element.url, 5);
                            this.next();

                            return true;
                        }
                    }

                });

                if (!bIsDefault)
                {
                    return false;
                }
            },
            action: function() {Herokit.init.run(this); } //function wrapper is needed because this context is needed as parameter
        });*/
    }
}
