//instance for Router in Herokit Routing
Herokit.Router = {};
Herokit.Router.setup = function(){
    Herokit.Helper.debug.log("Herokit.Router.setup", 5);

    //add OnBeforeActions
    _.each(Herokit.Behavior.OnBeforeActions, function(element, index, list){
        Herokit.Helper.debug.log("Herokit.Behavior.OnBeforeAction apply "+element.type+" rule '"+element.name+"'with options: "+_.toArray(element.options).join(", ")+"", 5);
        element.apply();    //apply now onbefore rules
    });

    this.setupStates();
    Herokit.init.setSetupReady();

};

Herokit.Router.setupStates = function() {
    Herokit.Helper.debug.log("Herokit.Router.setupStates", 5);

    var i=0;
    for (i=0;i<Herokit.Env.Routing.availableRouters.length;i++)
    {
        Herokit.Helper.getRouter(Herokit.Env.Routing.availableRouters[i]).setupStates();
    }

    return i;
}
Herokit.Router.getStates = function() {
        return Herokit.Behavior.States;
};
Herokit.Router.getState = function(name) {
        if (typeof Herokit.Behavior.States[name] === 'undefined') throw new Herokit.Error("State "+name+" unknown.");
        return Herokit.Behavior.States[name];
};
