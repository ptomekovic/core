Herokit.Error=Herokit.Error || {}; //init error if not yet defined
Herokit.Error = function (message, fileName, lineNumber){
    throw new Error (message, fileName, lineNumber);
};
Herokit.Error.prototype = {};
