/**
 * Created by user on 09.09.15.
 */
define(['jquery', 'FormParsleyAjax', 'handlebars', 'Utils', 'i18next', 'moment'],
    function($, FormParsleyAjax, Handlebars, Utils, i18next, moment) {

    $('#test-form :submit').html('Submit <i class="glyphicon glyphicon-alert"></i>');

    return {
        init:function(){


            var F = new FormParsleyAjax('#test-form');
            //console.log(F);


            var template = Handlebars.compile( 'Привет {{name}}!' );
            $('#home').html( template({name: 'Вася'}) );


            i18next.init({ lng: "ru-RU", getAsync: false  });
            Utils.showAlert(i18next.t('app.name'), 'warning');


            $('#confirm-test-1').click(function(){
                Utils.confirm('э чувак ты уверен?', 'да', 'найн', function(){
                    console.log('Да');
                }, function(){
                    console.log('Нет');
                });
            });

            $('#confirm-test-2').click(function(){
                Utils.confirm(false, false, false, function(){
                    console.log('Да');
                }, function(){
                    console.log('Нет');
                });
            });


            $('#confirm-test-3').click(function(){
                Utils.confirm('Вопрос?', function(){
                    console.log('Да');
                });
            });
        }
    };
});