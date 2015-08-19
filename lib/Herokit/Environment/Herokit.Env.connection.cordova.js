/** http://docs.phonegap.com/en/edge/cordova_connection_connection.md.html
Required plugin https://github.com/apache/cordova-plugin-network-information
*/
Herokit.Env.Connection.state = function () {
    return navigator.connection.type;
}
Herokit.Env.Connection.isUnknown = function () {
    if (navigator.connection.type==Connection.UNKNOWN) return true;
    else false;
}
Herokit.Env.Connection.isEthernet = function () {
    if (navigator.connection.type==Connection.ETHERNET) return true;
    else false;
}
Herokit.Env.Connection.isWifi = function () {
    if (navigator.connection.type==Connection.WIFI) return true;
    else false;
}
Herokit.Env.Connection.is2G = function () {
    if (navigator.connection.type==Connection.CELL_2G) return true;
    else false;
}
Herokit.Env.Connection.is3G = function () {
    if (navigator.connection.type==Connection.CELL_3G) return true;
    else false;
}
Herokit.Env.Connection.is4G = function () {
    if (navigator.connection.type==Connection.CELL_4G) return true;
    else false;
}
Herokit.Env.Connection.isCell = function () {
    if (navigator.connection.type==Connection.CELL) return true;
    else false;
}
Herokit.Env.Connection.isOffline = function () {
    if (navigator.connection.type==Connection.NONE || !Meteor.status().connected) return true;
    else false;
}
Herokit.Env.Connection.isMobile = function () {
    var aStates=[Connection.CELL_2G,Connection.CELL_3G,Connection.CELL_4G,Connection.CELL];

    if (aStates.indexOf(navigator.connection.type )) return true;
    else false;
}
Herokit.Env.Connection.isMobile = function () {
    var aStates=[Connection.CELL_2G,Connection.CELL_3G,Connection.CELL_4G,Connection.CELL];

    if (aStates.indexOf(navigator.connection.type )) return true;
    else false;
}
Herokit.Env.Connection.isWeak = function () {
    var aStates=[Connection.CELL_2G,Connection.CELL_3G,Connection.CELL_4G,Connection.CELL];

    if (aStates.indexOf(navigator.connection.type )) return true;
    else false;
}
Herokit.Env.Connection.isStrong = function () {
    var aStates=[Connection.ETHERNET,Connection.WIFI,Connection.CELL_4G];

    if (aStates.indexOf(navigator.connection.type )) return true;
    else false;
}
Herokit.Env.Connection.name = function () {
    var networkState = Herokit.Env.Connection.state();
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = 'Cell 2G';
    states[Connection.CELL_3G]  = 'Cell 3G';
    states[Connection.CELL_4G]  = 'Cell 4G';
    states[Connection.CELL]     = 'Cell generic';
    states[Connection.NONE]     = 'No network';

    return states[networkState];
}
