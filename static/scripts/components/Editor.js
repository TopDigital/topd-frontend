define(['TinyMCE'], function(TinyMCE) {

    return {
        init:function(selector){
            TinyMCE.init({
                selector: selector,
                theme: "modern",
                language: "ru",
                language_url : "/locales/ru-RU/tinyMCE.js",

                convert_fonts_to_spans : true,
                paste_as_text: true,

                content_css: false,

                plugins: [
                    "advlist autolink link image lists charmap hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                    "table contextmenu directionality paste textcolor code"
                ],

                menubar: false,
                toolbar1: "pastetext | insertfile undo redo | fontselect fontsizeselect | blockquote link image media | table | fullscreen code",
                toolbar2: "bold italic underline superscript subscript | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor"
            });
        }
    };
});