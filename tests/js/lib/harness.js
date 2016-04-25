/*

    The "test harness" (and instance of gpii-express) that hosts the UL API with the integrated widget code.

 */

"use strict";
var fluid = require("infusion");

require("ul-api");


// gpii.ul.api.loadTestingSupport();
/*
    If we load the test harness using the above code, we end up with errors like:

    11:40:03.440:  jq: ***************
    11:40:03.440:  jq: Failure in fixture file - no tests were queued - FAIL
    11:40:03.440:  jq: ***************

    TODO:  Review with Antranig and remove workaround below
 */

require(fluid.module.resolvePath("%ul-api/tests/js/lib/test-harness.js"));

// The API test harness with our local templates and code
fluid.defaults("gpii.test.userReviewWidget.harness", {
    gradeNames: ["gpii.ul.api.tests.harness"],
    templateDirs: ["%gpii-user-review-widget/src/templates", "%ul-api/src/templates", "%gpii-express-user/src/templates", "%gpii-json-schema/src/templates"],
    ports: {
        api:   7654,
        pouch: 7631
    },
    components: {
        express: {
            options: {
                components: {
                    src: {
                        options: {
                            content: ["%gpii-user-review-widget", "%ul-api/src"]
                        }
                    }
                }
            }
        }
    }
});