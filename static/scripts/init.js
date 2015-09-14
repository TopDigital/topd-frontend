requirejs.config({
    baseUrl: '/static/scripts',
    paths: {
        'jquery': '../components/jquery/dist/jquery.min',
        'jquery-form': '../components/jquery-form/jquery.form',
        'parsley': '../components/parsleyjs/dist/parsley.min',
        'bootstrap': '../components/bootstrap/dist/js/bootstrap.min',
        'handlebars': '../components/handlebars/handlebars.amd.min',
        'i18next': '../components/i18next/i18next.amd.min',
        'moment': '../components/moment/min/moment.min',
        'Utils': 'components/Utils',
        'FormParsleyAjax': 'components/FormParsleyAjax'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'jquery-form-validator': {
            'deps': ['jquery']
        },
        'bootstrap': {
            'deps': ['jquery']
        }
    }
});

window.ParsleyConfig = {
    autoBind: false,
    errorClass: 'has-error',
    successClass: 'has-success',
    classHandler: function(ParsleyField) {
        return ParsleyField.$element.parents('.form-group');
    },
    errorsContainer: function(ParsleyField) {
        return ParsleyField.$element.parents('.form-group');
    },
    errorsWrapper: '<span class="help-block">',
    errorTemplate: '<div></div>'
};

requirejs(['jquery', 'app'], function($, Application) {
    $(document).ready(function() {
        var myApplication = new Application();
        myApplication.run();
    });
});