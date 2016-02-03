/* globals $ */
'use strict';
angular.module('indigoeln')
    .factory('formUtils', function () {
        return {
            doVertical: function (tAttrs, tElement) {
                if (tAttrs.myLabelVertical) {
                    tElement.find('.col-xs-2').removeClass('col-xs-2');
                    tElement.find('.col-xs-10').children().unwrap();
                }
            }
        }
    })
    .directive('showValidation', function () {
        return {
            restrict: 'A',
            require: 'form',
            link: function (scope, element) {
                element.find('.form-group').each(function () {
                    var $formGroup = $(this);
                    var $inputs = $formGroup.find('input[ng-model],textarea[ng-model],select[ng-model]');

                    if ($inputs.length > 0) {
                        $inputs.each(function () {
                            var $input = $(this);
                            scope.$watch(function () {
                                return $input.hasClass('ng-invalid') && $input.hasClass('ng-dirty');
                            }, function (isInvalid) {
                                $formGroup.toggleClass('has-error', isInvalid);
                            });
                        });
                    }
                });
            }
        };
    }).directive('myInput', function (formUtils) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            myLabel: '@',
            myLabelVertical: '=',
            myName: '@',
            myModel: '=',
            myReadonly: '=',
            myType: '@',
            myValidationObj: '=',
            myValidationRequired: '=',
            myValidationMaxlength: '@'
        },
        compile: function (tElement, tAttrs, transclude) {
            formUtils.doVertical(tAttrs, tElement);
        },
        template: '<div class="form-group">' +
        '<label class="col-xs-2 control-label">{{myLabel}}</label>' +
        '<div class="col-xs-10">' +
        '<input type="{{myType}}" class="form-control" name="{{myName}}" ng-model="myModel" ng-readonly="myReadonly" ng-required="myValidationRequired" ng-maxlength="myValidationMaxlength">' +
        '<div ng-show="myValidationObj.$invalid">' +
        '<p class="help-block" ng-show="myValidationObj.$error.required"> This field is required. </p>' +
        '<p class="help-block" ng-show="myValidationObj.$error.maxlength" > This field cannot be longer than {{myValidationMaxlength}} characters.</p>' +
        '</div>' +
        '</div>' +
        '</div>'
    };
}).directive('myCheckbox', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            myLabel: '@',
            myModel: '=',
            myName: '@'
        },
        template: '<div class="form-group">' +
        '<div class="col-xs-offset-2 col-xs-10">' +
        '<div class="checkbox">' +
        '<label>' +
        '<input type="checkbox" id="{{myName}}" ng-model="myModel"> {{myLabel}}' +
        '</label> ' +
        '</div> ' +
        '</div> ' +
        '</div> '
    };
}).directive('mySelect', function (formUtils) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            myLabel: '@',
            myName: '@',
            myModel: '=',
            myItems: '=',
            myMultiple: '=',
            myLabelVertical: '='
        },
        compile: function (tElement, tAttrs, transclude) {
            tElement.find('select').prop("multiple", tAttrs.myMultiple);
            formUtils.doVertical(tAttrs, tElement);
        },
        template: '<div class="form-group">' +
        '<label class="col-xs-2 control-label">{{myLabel}}</label>' +
        '<div class="col-xs-10">' +
        '<select class="form-control" name="{{myName}}" ng-model="myModel" ng-options="item.name for item in myItems" ></select>' +
        '</div>' +
        '</div>'
    };
}).directive('myTwoToggle', function (formUtils) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            myLabel: '@',
            myModel: '=',
            myFirst: '@',
            mySecond: '@',
            myLabelVertical: '='
        },
        compile: function (tElement, tAttrs, transclude) {
            formUtils.doVertical(tAttrs, tElement);
            if (tAttrs.myLabelVertical) {
                $("<br/>").insertAfter(tElement.find('label').first());
            }
        },
        template: '<div class="form-group">' +
        '<label class="col-xs-2 control-label">{{myLabel}}</label>' +
        '<div class="col-xs-10">' +
        '<div class="btn-group">' +
        '<label class="btn btn-info" ng-model="myModel" uib-btn-radio="myFirst" uncheckable>{{myFirst}}</label>' +
        '<label class="btn btn-info" ng-model="myModel" uib-btn-radio="mySecond" uncheckable>{{mySecond}}</label>' +
        '</div>' +
        '</div> ' +
        '</div> '
    };
}).directive('myTextArea', function (formUtils) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            myLabel: '@',
            myModel: '=',
            myLabelVertical: '='
        },
        compile: function (tElement, tAttrs, transclude) {
            formUtils.doVertical(tAttrs, tElement);
        },
        template: '<div class="form-group">' +
        '<label class="col-xs-2 control-label">{{myLabel}}</label> ' +
        '<div class="col-xs-10">' +
        '<textarea class="form-control" rows="3" ng-model="myModel"></textarea>' +
        '</div> ' +
        '</div> '
    };
}).directive('mySimpleText', function (formUtils) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            myLabel: '@',
            myModel: '=',
            myEmptyText: '@'
        },
        compile: function (tElement, tAttrs, transclude) {
            //formUtils.doVertical(tAttrs, tElement);
        },
        template: '<div class="form-group">' +
        '<label class="col-xs-2 control-label">' +
        '{{myLabel}} ' +
        '</label>' +
        '<div class="col-xs-10" style="padding-top: 7px;">' +
        '{{myModel||myEmptyText}}' +
        '</div>' +
        '</div>'
    };
});
