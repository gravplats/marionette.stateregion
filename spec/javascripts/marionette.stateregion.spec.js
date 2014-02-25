describe('state region', function() {
    'use strict';

    var InitialView, TransitionView;

    beforeEach(function() {
        loadFixtures('initial-template.html', 'transition-template.html', 'region.html');

        InitialView = Marionette.ItemView.extend({
            template: '#initial-template'
        });

        TransitionView = Marionette.ItemView.extend({
            template: '#transition-template'
        });
    });

    describe('when intializing a state region view no `initialView` specified', function() {
        var MissingInitialViewRegion = Marionette.StateRegion.extend();

        it('should throw an error saying there is no `initialView` option', function() {
            expect(function() { new MissingInitialViewRegion(); }).toThrow();
        });
    });

    describe('when initializing a state region with no `views` specified', function() {
        var MissingViewsRegion = Marionette.StateRegion.extend({
            initialView: 'view:initial'
        });

        it('should throw an error saying there is no `views` option', function() {
            expect(function() { new MissingViewsRegion(); }).toThrow();
        });
    });

    describe('when displaying', function() {
        var region;

        beforeEach(function() {
            var StateRegion = Marionette.StateRegion.extend({
                initialView: 'view:initial',

                views: {
                    'view:initial': InitialView
                }
            });

            region = new StateRegion({
                el: '#region',
                regionType: StateRegion
            });

            region.display();
        });

        it('should render the initial template', function() {
            expect(region.$el).toHaveText(/initial/);
        });
    });

    describe('when transitioning to another view', function() {
        var region;

        beforeEach(function() {
            var StateRegion = Marionette.StateRegion.extend({
                initialView: 'view:initial',

                views: {
                    'view:initial': InitialView,
                    'view:transition': TransitionView
                }
            });

            region = new StateRegion({
                el: '#region',
                regionType: StateRegion
            });

            region.display();
            region.currentView.trigger('view:transition');
        });

        it('should render the current template', function() {
            expect(region.$el).toHaveText(/transition/);
        });
    });

});