'use strict';
angular.module('app.directives', ['ngRoute'])
.directive('contenteditable', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
            // view -> model
            elm.bind('blur', function() {
            	scope.$apply(function() {
            		ctrl.$setViewValue(elm.html());
            	});
            });

            // model -> view
            ctrl.render = function(value) {
            	elm.html(value);
            };

            // load init value from DOM
            ctrl.$setViewValue(elm.html());

            elm.bind('keydown', function(event) {
            	var esc = event.which == 27,
            	el = event.target;

            	if (esc) {
            		console.log("esc");
            		ctrl.$setViewValue(elm.html());
            		el.blur();
            		event.preventDefault();                        
            	}
            	
            });
            
          }
        };
      });