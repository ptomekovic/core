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
Herokit.Behavior.query = function(queryname){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryData "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' )
        throw new Herokit.Error("Query "+queryname+" undefined.");

    return new Herokit.Helper.query(Herokit.Behavior.getQueryData(queryname));
};
Herokit.query = Herokit.Behavior.query; //Short version for query
Herokit.Behavior.getQuery = function(queryname){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryData "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' )
        throw new Herokit.Error("Query "+queryname+" undefined.");

    return Herokit.Behavior.Queries[queryname];
};
Herokit.Behavior.getQueryData = function(queryname, args){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryData "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' ) //this should never happen due to prior autocreation of new collections
        throw new Herokit.Error("Query "+queryname+" undefined.");

    if (typeof Herokit.Behavior.Queries[queryname].query=='function') return Herokit.Behavior.Queries[queryname].query(args);
    return Herokit.Behavior.Queries[queryname].query;
};
Herokit.Behavior.getQueryOptions = function(queryname, args){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryData "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' ) //this should never happen due to prior autocreation of new collections
        throw new Herokit.Error("Query "+queryname+" undefined.");

    if (typeof Herokit.Behavior.Queries[queryname].options === 'undefined' ) return {};
    else if (typeof Herokit.Behavior.Queries[queryname].options=='function') return Herokit.Behavior.Queries[queryname].options(args);
    else return Herokit.Behavior.Queries[queryname].options;
};
Herokit.Behavior.getQuerySort = function(queryname){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQuerySort "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' ) //this should never happen due to prior autocreation of new collections
        throw new Herokit.Error("Query "+queryname+" undefined.");

    if (typeof Herokit.Behavior.Queries[queryname].options === 'undefined')
        return {};
    else {
        if (typeof Herokit.Behavior.Queries[queryname].options=='function')
            var queryOptions = Herokit.Behavior.Queries[queryname].options();
        else
            var queryOptions = Herokit.Behavior.Queries[queryname].options;

            if (typeof Herokit.Behavior.Queries[queryname].options.sort === 'undefined') return {};

        return queryOptions.sort;
    }
};
Herokit.Behavior.getQueryLimit = function(queryname){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryLimit "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' ) //this should never happen due to prior autocreation of new collections
        throw new Herokit.Error("Query "+queryname+" undefined.");

    if (typeof Herokit.Behavior.Queries[queryname].options === 'undefined')
        return {};
    else {
        if (typeof Herokit.Behavior.Queries[queryname].options=='function')
            var queryOptions = Herokit.Behavior.Queries[queryname].options();
        else
            var queryOptions = Herokit.Behavior.Queries[queryname].options;

        if (typeof Herokit.Behavior.Queries[queryname].options.limit === 'undefined') return {};

        return queryOptions.limit;
    }
};
Herokit.Behavior.getQueryFields = function(queryname){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Behavior.getQueryFields "+queryname);
    if (typeof queryname === 'undefined') throw new Herokit.Error("Queryname parameter undefined.");

    if (typeof Herokit.Behavior.Queries[queryname] === 'undefined' ) //this should never happen due to prior autocreation of new collections
        throw new Herokit.Error("Query "+queryname+" undefined.");

    if (typeof Herokit.Behavior.Queries[queryname].options === 'undefined')
        return {};
    else {
        if (typeof Herokit.Behavior.Queries[queryname].options=='function')
            var queryOptions = Herokit.Behavior.Queries[queryname].options();
        else
            var queryOptions = Herokit.Behavior.Queries[queryname].options;

        if (typeof Herokit.Behavior.Queries[queryname].options.fields === 'undefined') return {};

        return queryOptions.fields;
    }
};