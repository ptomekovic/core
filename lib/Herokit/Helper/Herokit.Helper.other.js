Herokit.Helper.hasRouter = function(routername)
{
    if (Herokit.Env.Routing.availableRouters.indexOf(routername)!==-1) return true;
    else return false;
};
Herokit.Helper.getRouter = function(routername)
{
    if (typeof routername === 'undefined') throw new Herokit.Error("Router name parameter missing.");
    if (!Herokit.Helper.hasRouter(routername)) throw new Herokit.Error("Router "+routername+" unknown.");

    return Herokit.Router[routername];
};
Herokit.Helper.NgMeteorClone=function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = {};

    for (var attr in obj) {
        if (obj.hasOwnProperty(attr) && !attr.match(/\$/g) && typeof obj[attr] != 'function' && attr!='_serverBackup' && attr!='autorunComputation') copy[attr] = EJSON.clone(obj[attr]);
    }
    return copy;
};

Herokit.Helper.isNumber=function(o) {
    return (typeof o === 'number' || !isNaN(parseFloat(o))) && isFinite(o);
};
