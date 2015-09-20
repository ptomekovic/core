function getFilesFromFolder(packageName, folder) {
    // local imports
    var _ = Npm.require("underscore");
    var fs = Npm.require("fs");
    var path = Npm.require("path");
    // helper function, walks recursively inside nested folders and return absolute filenames
    function walk(folder) {
        var filenames = [];
        // get relative filenames from folder
        var folderContent = fs.readdirSync(folder);
        // iterate over the folder content to handle nested folders
        _.each(folderContent, function (filename) {
            // build absolute filename
            var absoluteFilename = folder + path.sep + filename;
            // get file stats
            var stat = fs.statSync(absoluteFilename);
            if (stat.isDirectory()) {
                // directory case => add filenames fetched from recursive call
                filenames = filenames.concat(walk(absoluteFilename));
            } else {
                // file case => simply add it
                filenames.push(absoluteFilename);
            }
        });
        return filenames;
    }
    // save current working directory (something like "/home/user/projects/my-project")
    var cwd = process.cwd();
    // chdir to our package directory
    process.chdir("packages" + path.sep + packageName);
    // launch initial walk
    var result = walk(folder);
    // restore previous cwd
    process.chdir(cwd);
    return result;
}

Package.describe({
    name: 'herokit:core',
    version: '0.0.13',
    // Brief, one-line summary of the package.
    summary: 'The Framework for heroes with the best of meteor and angular',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/herokit/core.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    var both = ['client', 'server'];

    api.versionsFrom('1.1.0.2');
    api.use('meteor-platform');
    api.use('urigo:angular@0.10.2');
    api.use('angular:angular@1.4.6');
    api.use('angular:angular-animate@1.4.6');
    api.use('mquandalle:bower@1.4.1_3');
    api.use('aldeed:collection2@2.5.0');
    api.use('iron:router@1.0.9');

    Cordova.depends({
        'org.apache.cordova.network-information': '0.2.15'
    });

    var HerokitLibFilesBoth = ['lib/herokit.def.js',
        'lib/Herokit/Config/Herokit.Config.js',
        'lib/Herokit/Logic/Herokit.Logic.def.js',
        'lib/Herokit/Behavior/Herokit.Queries.js',
        'lib/Herokit/Helper/Herokit.Helper.debug.js',
        'lib/Herokit/Helper/Herokit.Helper.filtermanager.js',
        'lib/Herokit/Helper/Herokit.Helper.other.js',
        'lib/Herokit/Error/Herokit.Error.js',
        'lib/Herokit/Environment/Herokit.Env.functions.js',
        'lib/Herokit/Router/Herokit.Router.js',
        'lib/Herokit/Router/Herokit.Router.OnBeforeRule.js',
        'lib/Herokit/Router/Herokit.Router.IronRouter.js',
        'lib/Herokit/Router/Herokit.Router.UiRouter.js',
        'lib/Herokit/Data/Herokit.Schemas.js',
        'lib/Herokit/Init/Herokit.Init.js',
        'lib/Herokit/Init/Herokit.Init.App.js', //here is the real app initialization
        'lib/Herokit/Init/startup.js'
    ];

    var HerokitLibFilesClient = [
        'lib/Herokit/Init/autoinit.client.js'
    ];

    var clientFiles = [
        'lib/Herokit/Environment/Herokit.Env.connection.js',
        'client/ngHerokit/app.js',
        'client/ngHerokit/debug/UIRouteConsoleLogger.js',
        'client/ngHerokit/controllers/ngHerokitFormController.js',
        'client/ngHerokit/controllers/ngHerokitListController.js',
        'client/ngHerokit/controllers/ngHerokitOnlineStatusController.js',
        'client/ngHerokit/controllers/ngHerokitShowController.js',
        'client/ngHerokit/directives.js',
        'client/ngHerokit/factories/Herokit.js',
        'client/ngHerokit/factories/HeroPage.js',
        'client/ngHerokit/factories/onlineStatus.js',
        'client/ngHerokit/filters.js'];

      var cordovaFiles = [
          'lib/Herokit/Environment/Herokit.Env.connection.cordova.js'];

    api.add_files(['lib/bower/.bowerrc', 'lib/bower/bower.json'], both);

    api.add_files(HerokitLibFilesBoth, both);

    api.add_files(HerokitLibFilesClient, "client");

    api.add_files(clientFiles, "client");
    api.add_files(cordovaFiles, "web.cordova");

    /* Export Section */

    /* Herokit main */
    api.export("Herokit");

    api.export("Router");   // Iron Router
    api.export("SimpleSchema");

});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('herokit:core');
    api.addFiles('herokit-tests.js');
});
