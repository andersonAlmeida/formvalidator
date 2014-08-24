/*global jQuery:false */
(function ($) {
    "use strict";

    $.fn.formValidator = function (options) {
        var defaults = {
            messageField: ".message"
        },
            settings = $.extend( {}, defaults, options ),
            errorField = $(settings.messageField);

        function notNull (field) {
            var val = field.val();

            if(val !== "" && val.match(/[^\s+$]/)) {
                return true;
            }

            return false;
        }

        function isEmail (field) {
             var val = field.val();

            if(val.match(/^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/)) {
                return true;
            }

            return false;
        } 

        function checkType (field) {
            var type = field.attr("type");

            switch(type) {
                case "checkbox":
                    if( !field.is(":checked") ) {                        
                        return false;
                    }
                    return true;

                case "radio":
                    var options = field.parents("form").find("input[type=radio]").attr("name", field.attr("name"));
                
                    for(var i=0; i < options.length; i++) {
                        if($(options[i]).is(":checked")) {
                            return true;
                        }
                    }
                    return false;
            }
        }

        function compare (field) {
            // debugger;
            var val1 = field.val(),
                val2 = field.parents("form").find("input[name=" + field.attr("confirm") + "]").val();

            if(val1 === val2) {
                return true;
            }
            return false;
        }

        function showErrorMessage (form, field) {
            form.find(errorField).text(field.attr("error-message"));
            field.focus();
        }

        function validate (form) {      

            form.on("submit", function () {

                var fields = form.find("input, select, textarea");
                
                for(var i = 0; i < fields.length; i++) {
                    var field =  $(fields[i]),
                        attr = field.attr("novalidate");
                    
                    if( typeof attr !== typeof undefined && attr !== false ) {
                        continue;
                    }

                    if(field.attr("type") !== "checkbox" && field.attr("type") !== "radio") {
                        if(!notNull(field)) {
                            showErrorMessage(form, field);
                            return false;
                        }  

                        if(field.attr("type") === "email") {
                            if(!isEmail(field)) {
                                showErrorMessage(form, field);
                                return false;
                            }
                        }
                        
                        if(typeof field.attr("confirm") !== typeof undefined && field.attr("confirm") !== false) {
                            if(!compare(field)) {
                                showErrorMessage(form, field);                         
                                return false;
                            }
                        }                      
                    } else {                        
                        if(checkType(field) === false) {  
                            showErrorMessage(form, field);                        
                            return false;
                        }
                    }                    
                }                
            });
        }

        return this.each (function () {
            var form = $(this);
            form.attr("novalidate","novalidate");
            validate(form);
        });
    };
})(jQuery);