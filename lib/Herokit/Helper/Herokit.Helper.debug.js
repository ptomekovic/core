Herokit.Helper.debug = Herokit.Helper.debug || {}; //init debug helper of not yet defined
Herokit.Helper.debug.log = function (logstring, loglevel) {
    if (Herokit.Helper.debug.isLog(loglevel))
        console.log(logstring);
}
Herokit.Helper.debug.isLogLvl = function (requiredLoglevel) {
    if (typeof Herokit.Config.debug.loglevel === 'undefined' || Herokit.Config.debug.loglevel >= requiredLoglevel) return true;
    else return false;
}
Herokit.Helper.debug.isLog = function (loglevel) {
    if (Herokit.Config.debug.console === true && Herokit.Helper.debug.isLogLvl(loglevel)) return true;
    else return false;
}

Herokit.Helper.debug.getActiveSubscriptions = function (logToConsole) {
    if (typeof logToConsole === 'undefined') logToConsole=true;
    var subs = Meteor.default_connection._subscriptions; //all the subscriptions that have been subscribed.

    if (logToConsole)
    {
        Object.keys(subs).forEach(function (key) {
            console.log(subs[key]); // see them in console.
        });
    }

    return subs;
}

Herokit.Helper.debug.reactivity = function () {

    var wrappedFind = Meteor.Collection.prototype.find;

    Meteor.Collection.prototype.find = function () {
        var cursor = wrappedFind.apply(this, arguments);
        var collectionName = this._name;

        cursor.observeChanges({
            added: function (id, fields) {
                console.log(collectionName, 'added', id, fields);
            },

            changed: function (id, fields) {
                console.log(collectionName, 'changed', id, fields);
            },

            movedBefore: function (id, before) {
                console.log(collectionName, 'movedBefore', id, before);
            },

            removed: function (id) {
                console.log(collectionName, 'removed', id);
            }
        });

        return cursor;
    };

    Meteor.autorun(function (computation) {
        computation.onInvalidate(function () {
            console.trace();
        });

        // standard autorun code...
    });
}
