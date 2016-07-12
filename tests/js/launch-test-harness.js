// Launch the test harness as a standalone server to assist in manual QA.
//
"use strict";
var fluid = require("infusion");
fluid.setLogging(true);

var gpii  = fluid.registerNamespace("gpii");

require("./lib/harness");

gpii.test.userReviewWidget.harness({
    ports: {
        "api":   6941,
        "pouch": 6951
    }
});