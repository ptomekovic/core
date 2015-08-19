Herokit.Env.Connection = {};
Herokit.Env.Connection.isOnline = function () {
   if (!Herokit.Env.Connection.isOffline()) return true;
   else return false;
}
Herokit.Env.Connection.isOffline = function () {
    if (!Meteor.status().connected || (typeof navigator.onLine!=='undefined' && navigator.onLine==false)) return true;
    else false;
}
