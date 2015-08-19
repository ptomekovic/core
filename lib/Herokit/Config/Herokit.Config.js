Herokit.Config.addNgModule = function (ngModuleName) {
    Herokit.Helper.debug.log("Herokit.Config.addNgModule "+ngModuleName, 5);

    check(ngModuleName, Match.OneOf(String, [String])); //allowed string or array

    if (Match.test(ngModuleName, String)) Herokit.Config.ngModules.push(ngModuleName);
    else Herokit.Config.ngModules.concat(ngModuleName);

    return Herokit.Config.ngModules;
};
