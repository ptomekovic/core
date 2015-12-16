Herokit.Models.get = function (modelname) {
    if (typeof Herokit.Models._instances[modelname] !== 'undefined')
        return Herokit.Models._instances[modelname];
    else
        return Herokit.Models._init(modelname);
};
Herokit.Models._init = function (modelname) {
    if (typeof Herokit.Models[modelname] !== 'undefined' && typeof Herokit.Models[modelname]=='function')
        return Herokit.Models._instances[modelname] = new Herokit.Models[modelname]();
    else
        throw new Meteor.Error("No Model " + modelname + " found.");
};
Herokit.Models._setup = function () {
    _.each(Herokit.Models, function(value, key, list){
        if (typeof key.charAt(0) != '_' && typeof key != 'get' && typeof value=='function')
            Herokit.Models._init(key);
    });
};
