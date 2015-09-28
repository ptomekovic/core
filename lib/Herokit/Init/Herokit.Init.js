'use strict';

Herokit.init = {}
Herokit.init.startup = function() {
    Herokit.Helper.debug.log("STARTUP PHASE - Herokit init.startup\r\n--------------------------------------", 5);
    if (Herokit.Env.isClient || Herokit.Env.isCordova)
        return Herokit.init.startupClient();
    else if (Herokit.Env.isServer)
        return Herokit.init.startupServer();
    else
        throw new Herokit.Error("Unknown Environment. Initialization of Herokit aborted.");
};
Herokit.init.do = function() {
    Herokit.Helper.debug.log("Herokit init.do", 5);
    if (Herokit.Env.isClient || Herokit.Env.isCordova)
        return Herokit.init.initClient();
    else if (Herokit.Env.isServer)
        return Herokit.init.initServer();
    else
        throw new Herokit.Error("Unknown Environment. Initialization of Herokit aborted.");
};
Herokit.init.initClient = function()
{
    Herokit.Helper.debug.log("Herokit.init.initClient", 5);
    //init only once, break if is yet ready
    if (Herokit.Env.isHerokitReady)
    {
        Herokit.Helper.debug.log("Herokit is yet ready. BREAK!", 5);
        return this;
    }
    Herokit.Data._schemas.__setup();
    Herokit.Router.setup();

    return this;
};
Herokit.init.initServer = function()
{
    Herokit.Helper.debug.log("Herokit.init.initServer", 5);
    //init only once, break if is yet ready
    if (Herokit.Env.isHerokitReady) return this;

    Herokit.Data._schemas.__setup();

    return this;
};
Herokit.init.startupClient = function()
{
    Herokit.Helper.debug.log("Herokit.init.startupClient", 5);
    Herokit.init.do();

    return this;
};
Herokit.init.startupServer = function()
{
    Herokit.Helper.debug.log("Herokit.init.startupServer", 5);
    Herokit.init.do();

    return this;
};
Herokit.init.setSetupReady = function()
{
    Herokit.Helper.debug.log("HEROKIT SETUP NOW READY (Herokit.init.setSetupReady) ---------------------------", 5);
    Herokit.Env._isHerokitSetupReady=true;
}
Herokit.init.app = function(appName)
{
    Herokit.Helper.debug.log("Herokit.init.newApp", 5);

    if (typeof appName !== 'undefined')  {
        Herokit.Helper.debug.log("Herokit.init.newApp: Set app name to "+appName, 5);
        Herokit.Config.ngAppName = appName; //set appname if defined; otherwise default is used
    }

    Herokit.init.initNgModules();
}
