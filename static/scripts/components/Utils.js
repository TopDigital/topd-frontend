define( 'Utils', [ 'jquery', 'handlebars' ], function($, Handlebars ){

    var ALERT_TPL = Handlebars.compile( '<div class="alert fade in {{type}}"><a class="close" data-dismiss="alert" href="#">&times;</a>{{text}}</div>' ),

        Utils = {
            numberFormat: function( number, decimals ){
                var n = number,
                    c = decimals === -1 ?
                        ((n || 0).toString().split('.')[1] || '').length : // preserve decimals
                        (isNaN(decimals = Math.abs(decimals)) ? 2 : decimals),
                    d = '.',
                    t = ' ',
                    s = n < 0 ? "-" : "",
                    i = String(parseInt(n = Math.abs(+n || 0).toFixed(c), 10)),
                    j = i.length > 3 ? i.length % 3 : 0;

                return s + (j ? i.substr(0, j) + t : "") +
                    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
                    (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            },

            toNumber: function ( val ){
                return Number( val.replace( /[\s%]+/g , ''));
            },

            percent: function( val ){
                return this.numberFormat( val * 100 ) + '%';
            },

            autoInputSelection: function( input ){
                return function(){
                    input.focus();
                    input.selectionStart = 0;
                    input.selectionEnd = input.value.length;
                    return false;
                };
            },

            getErrorContainer: function(){
                return $('#global-errors');
            },

            showAlert: function( text, type, $container ){
                var $alert = $( ALERT_TPL({text: text, type: 'alert-'+ ( type ? type : 'danger' )}))
                    .appendTo( $container ? $container : this.getErrorContainer()  )
                    .hide()
                    .slideDown()
                    .bind( 'close', function (){
                        $alert.slideUp();
                    })
                    .bind( 'closed', function (){
                        $alert.remove();
                    });
            },

            clearAlerts: function( $container ){
                ($container ? $container : this.getErrorContainer()).empty();
            },

            modal: function( message ) {

            },

            confirm: function(question, submitButton, discardButton, submitCallback, discardCallback){
                if(typeof question === 'function'){
                    submitCallback = question;
                    question = null;
                }
                if(typeof submitButton === 'function'){
                    submitCallback = submitButton;
                    submitButton = null;
                }
                if(typeof discardButton === 'function'){
                    submitCallback = discardButton;
                    discardButton = null;
                }


                var $modal = $('#Utils-confirm-modal');

                if($modal.length == 0){
                    $modal = $(
                    [
                    '<div class="modal fade" id="Utils-confirm-modal" tabindex="-1" role="dialog" aria-labelledby="Utils-confirm-modal">' +
                        '<div class="modal-dialog" role="document">' +
                            '<div class="modal-content modal-sm">' +
                                //'<div class="modal-header">' +
                                //    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                //    '<h4 class="modal-title" id="myModalLabel">Modal title</h4>' +
                                //'</div>' +
                                '<div class="modal-body">' +
                    (question || 'Вы уверены?') +
                                '</div>' +
                                '<div class="modal-footer">' +
                                    '<button type="button" class="btn btn-default -discard-">' +
                    (discardButton || 'Нет') +
                                    '</button>' +
                                    '<button type="button" class="btn btn-primary -submit-">' +
                    (submitButton || 'Да') +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                    ].join(''));
                }

                $modal.modal();
                $modal.find('.-discard-').click(function(){
                    discardCallback && discardCallback.call($modal);
                    $modal.modal('hide');
                    $modal.detach();
                })
                $modal.find('.-submit-').click(function(){
                    submitCallback && submitCallback.call($modal);
                    $modal.modal('hide');
                    $modal.detach();
                });
            }
        };

    return Utils;
});
