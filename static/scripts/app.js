define('app', ['bootstrap', 'jquery', 'i18next'], function(undefined, $, i18next) {

    var App = function(){

        var appExternalData;

        return {
            setData: function (d) {
                appExternalData = d;
            },

            getData: function (name) {
                if ( appExternalData && appExternalData.hasOwnProperty( name )) {
                    return appExternalData[name];
                }

                return undefined;
            },

            getErrorContainer: function() {
                return $('#global-errors');
            },

            run: function () {
                if (window.appExternalData != undefined && typeof window.appExternalData === 'object') {
                    this.setData(window.appExternalData);
                    delete window.appExternalData;
                }

                i18next.init({ lng: "ru-RU", resGetPath: 'locales/ru-RU/translation.json', getAsync: false  });

                var controllerName = this.getData('controller');
                if(controllerName && controllerName != undefined){
                    requirejs([controllerName], function(controllerObject){
                        controllerObject && controllerObject.init();
                    });
                }
            }
        }
    };

    return App;
});