//instance for Router in Herokit Routing
Herokit.Behavior.setQuery = function(queryname, data, options){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryData "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");
    if (typeof data === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");
    if (typeof options === 'undefined') options = {};

    Herokit.Behavior.Queries[queryname]={};
    Herokit.Behavior.Queries[queryname].query = data;
    Herokit.Behavior.Queries[queryname].options = options;

    return Herokit.Behavior.Queries[queryname];
};
Herokit.Behavior.getQuery = function(queryname){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryData "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' )
        throw new Herokit.Error("Query "+queryname+" undefined.");

    return Herokit.Behavior.Queries[queryname];
};
Herokit.Behavior.getQueryData = function(queryname){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryData "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' ) //this should never happen due to prior autocreation of new collections
        throw new Herokit.Error("Query "+queryname+" undefined.");

    return Herokit.Behavior.Queries[queryname].query;
};
Herokit.Behavior.getQueryOptions = function(queryname){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryData "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' ) //this should never happen due to prior autocreation of new collections
        throw new Herokit.Error("Query "+queryname+" undefined.");

    if (typeof Herokit.Behavior.Queries[queryname].options === 'undefined' ) return {};
    else return Herokit.Behavior.Queries[queryname].options;
};
