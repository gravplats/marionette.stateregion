// Marionette.StateRegion
// --------------------
// v0.1.0
// 
// Copyright (c) 2014 Mattias Rydengren <mattias.rydengren@coderesque.com>
// Distributed under MIT license

Marionette.StateRegion = (function (Marionette, Backbone, _) {

    function ensure(obj, message) {
        if (!obj) {
            throw new Error(message);
        }

        return obj;
    }

    return Marionette.Region.extend({
        initialize: function() {
            ensure(this.initialView, 'Missing `initialState`');
            ensure(this.views, 'Missing `states`');
        },

        createView: function(ViewType) {
            return new ViewType({ model: this.model, collection: this.collection });
        },

        display: function(options) {
            options = options || {};
            this.model = options.model;
            this.collection = options.collection;

            this._transition(this.initialView);
        },

        _listen: function(view) {
            var self = this;
            _.each(this.views, function (ViewType, key) {
                view.on(key, function () {
                    self._transition(key);
                });
            });
        },

        _transition: function(key) {
            var ViewType = ensure(this.views[key], 'Missing `ViewType` for "' + key + '"');

            var view = this.createView(ViewType);
            this._listen(view);

            this.show(view);
        }
    });

})(Marionette, Backbone, _);