'use strict';

Herokit.init.bootstrapNgApp = function() {

	var onDeviceReady = function() {
		receivedEvent('deviceready');
	};

	var receivedEvent = function(event) {
		Herokit.Helper.debug.log('Start event received, bootstrapping application setup.', 4);
         angular.element(document).ready(function () {
             Herokit.Helper.debug.log('Document ready event received, bootstrapping application setup to '+Herokit.Config.ngBootstrapElement+'.', 4);

            if (typeof Herokit.Config.ngBootstrapElement !=='undefined') var boostrapElement = angular.element('#'+Herokit.Config.ngBootstrapElement);
            else var boostrapElement = angular.element('#'+Herokit.Config.ngAppName);

            //var boostrapElement = document;
		    if (!angular.element(boostrapElement).injector())
            {
                Herokit.Helper.debug.log('Bootstrapping NOW application '+Herokit.Config.ngAppName, 4);
                angular.bootstrap(boostrapElement, [Herokit.Config.ngAppName]);
                Herokit.Env.isHerokitReady=true;
            }
            else Herokit.Helper.debug.log('Angular yet injected, dont boot app '+Herokit.Config.ngAppName, 4);
        });
	};

	this.bindEvents = function() {
		document.addEventListener('deviceready', onDeviceReady, false);
	};

	//If cordova is present, wait for it to initialize, otherwise just try to
	//bootstrap the application.
	if (window.cordova !== undefined) {
		Herokit.Helper.debug.log('Cordova found, wating for device.',4);
		this.bindEvents();
	} else {
		Herokit.Helper.debug.log('Cordova not found, booting application',4);
		receivedEvent('manual');
	}
};

/* For older browsers and cordova, AngularJS should be bootstrapped only after the custom elements have been registered, and therefore you can't use automatic bootstrapping (ng-app="..."). You need to call angular.bootstrap() only after Polymer has been loaded, and with a wrapped DOM element
 */

//document.body.setAttribute('unresolved', "true");
//Herokit.Helper.debug.log(document.body);

Herokit.init.initNgApp = function (timecounter) {
    Herokit.Helper.debug.log("Herokit.init.initNgApp", 5);
    if (typeof timecounter == 'undefined' || !(timecounter>0)) timecounter=0;
    if (timecounter>=30000) throw new Herokit.Error("Angular not available. Timed out after "+timecounter+"ms. Aborting now.");

    if (typeof angular == 'undefined' || !Herokit.Env._isHerokitSetupReady) {
        if (typeof angular == 'undefined') Herokit.Helper.debug.log("angular not ready. Check agin in 30ms", 1);
        if (!Herokit.Env._isHerokitSetupReady) Herokit.Helper.debug.log("Herokit setup not ready. Check agin in 30ms", 1);

        setTimeout(function () {
            Herokit.init.initNgApp(timecounter+30);
        }, 30);
        return false;
    }

    // Bootstrap only once
    if (!angular.element(document).injector()) {
        new Herokit.init.bootstrapNgApp();
     }
    else {
        Herokit.Helper.debug.log("Herokit Angular yet Bootstraped, aborting.", 4);
    }
};

Herokit.init.run = function(routeContext) { return Herokit.init.runDefault(routeContext); };
Herokit.init.runDefault = function (routeContext) {
        Herokit.Helper.debug.log("Herokit init.runDefault", 5);

        if (typeof routeContext === 'undefined') throw new Herokit.Error("RouteContext undefined");

        Herokit.Helper.debug.log("Rendering now "+Herokit.Config.ngAppName, 5);

        routeContext.render(Herokit.Config.ngAppName);

        //setTimeout(function () {Herokit.init.initNgApp(); }, 1);   //muss aus irgend einem unerklärlichen grund asynchron sein
};

Herokit.init.initNgModules = function () {
    Herokit.Helper.debug.log("Herokit init.initNgModules: "+Herokit.Config.ngAppName, 5);
    Herokit.Helper.debug.log(Herokit.Config.ngModules, 5);
    Herokit.App = angular.module(Herokit.Config.ngAppName, Herokit.Config.ngModules);
};
