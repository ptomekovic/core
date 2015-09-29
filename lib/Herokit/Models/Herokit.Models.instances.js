Herokit.Models.get = function (modelname) {
    if (typeof Herokit.Models._instances[modelname] !== 'undefined')
        return Herokit.Models._instances[modelname];
    else
        throw new Meteor.Error("No instance for Model " + modelname + " found.");
};
Herokit.Models._init = function (modelname) {
    if (typeof Herokit.Models[modelname] !== 'undefined')
        return Herokit.Models._instances[modelname] = new Herokit.Models[modelname]();
    else
        throw new Meteor.Error("No Model " + modelname + " found.");
};