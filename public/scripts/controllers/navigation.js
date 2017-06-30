'use strict';

(function(module) {
    const navigation = {};

    navigation.loadIndexPage = function() {
        //TODO: fetch data

        $('.tab-content').fadeOut(1000);
        $('#home').fadeIn(1000);
    }

    navigation.loadStorePage = function() {
        $('.tab-content').fadeOut(1000);
        $('#store').fadeIn(1000);
    }

    navigation.loadMatcherPage = function() {
        $('.tab-content').fadeOut(1000);
        $('#matcher').fadeIn(1000);
    }

    navigation.loadCartPage = function() {
        $('.tab-content').fadeOut(1000);
        $('#cart').fadeIn(1000);
    }

    module.navigation = navigation;
})(window);