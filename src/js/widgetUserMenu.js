/*

    A component to relay changes in the user state between the Unified Listing controls and the widget.

 */
/* globals fluid, WidgetConf*/
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");

    fluid.registerNamespace("gpii.widget.userMenu");
    gpii.widget.userMenu.changeActiveUser = function (that) {
        if (WidgetConf) {
            WidgetConf.user = that.model.user ? that.model.user.username : undefined;
        }
    };

    fluid.defaults("gpii.widget.userMenu", {
        gradeNames: ["gpii.ul.hasUserControls"],
        modelListeners: {
            "user": {
                funcName: "gpii.widget.userMenu.changeActiveUser",
                args:     ["{that}"]
            }
        }
    });
})();