/**
 * http://parsleyjs.org/
 * http://malsup.com/jquery/form/#getting-started
 */
define(['jquery', 'jquery-form', 'parsley', 'Utils'], function($, undefined, parsley, Utils) {

    requirejs(['../components/parsleyjs/src/i18n/ru']);

    return function(formId, options){

        var _this = this,
            $form = $(formId),
            $submit = $form.find('[type=submit]'),
            $errors = $form.find('.-form-errors-'),

            type = $form.attr('data-type') || 'json',
            locked = false,

            $parsley = $form.parsley({})
        ;

        options = $.extend(true, {
            beforeSubmit: function(){
                return true;
            },
            error: function(){},
            success: function(){},
            loadingStart: function(){},
            loadingEnd: function(){}
        }, options);

        var showFieldsErrors = function(errors){
            for(var i = 0; i < errors.length; i++){
                _this.showFieldError(errors[i].field, errors[i].name, errors[i].message);
            }
        };

        $form.ajaxForm({
            dataType: type,
            beforeSerialize: function($form, options){

            },
            beforeSubmit: function(){
                if( _this.isLocked() ) {
                    return false;
                }
                _this.lock();

                var result = _this.isValid() && options.beforeSubmit.call( self );
                if( result ) {
                    options.loadingStart();
                    _this.clearAlerts();

                }else{
                    _this.unlock();
                }
                return result;
            },
            complete: function(xhr, status, $form){
                _this.unlock();
                options.loadingEnd();
            },
            error: function(xhr, status, error, $form){

            },
            success: function( content, status, xhr, $form ){
                if( 'json' === type ){
                    if( content.error ){
                        if( typeof content.error !== 'boolean' )
                            _this.showAlert( content.error , 'danger' );
                        options.error.call( _this, content );
                        return;
                    }
                    else if( content.validationErrors ){
                        if( typeof content.validationErrors !== 'boolean' )
                            showFieldsErrors( content.validationErrors );
                        options.error.call( _this, content );
                        return;
                    }
                    else if( content.warning ){
                        if( typeof content.warning !== 'boolean' )
                            _this.showAlert( content.warning , 'warning' );
                        options.error.call( _this, content );
                        return;
                    }
                    else if( content.success ){
                        if( typeof content.success !== 'boolean' )
                            _this.showAlert( content.success , 'success' );
                        options.success.call( _this, content );
                    }

                    if( content.redirect ){
                        options.loadingStart();
                        window.location.href = content.redirect;
                    }
                }
            }
        });


        this.isValid = function(){
            return $parsley.isValid();
        };

        this.isLocked = function(){
            return locked;
        };

        this.lock = function(){
            locked = true;
            $submit.attr( 'disabled', true );
        };

        this.unlock = function(){
            locked = false;
            $submit.attr( 'disabled', false );
        };

        this.clearAlerts = function(){
            $parsley.reset();
            Utils.clearAlerts($errors);
        };

        this.showAlert = function( text, type ){
            Utils.showAlert(text, type, $errors);
        };

        this.showFieldError = function( field, name, message ){
            var $fieldInstance = $form.find('[name=' + field +']').parsley();
            window.ParsleyUI.addError($fieldInstance, name, message);
        };

        this.validate = function(){
            _this.clearAlerts();
            return $parsley.validate();
        };

        this.validateField = function( field ){
            return $form.find('*[name=' + field +']').parsley().isValid();
        };


        _this.unlock();
    };
});
