/*

    The "test harness" (and instance of gpii-express) that hosts the UL API with the integrated widget code.

 */

"use strict";
var fluid = require("infusion");

require("ul-api");

fluid.require("%gpii-ul-api/tests/js/lib/test-harness.js");

// The API test harness with our local templates and code
fluid.defaults("gpii.test.userReviewWidget.harness", {
    gradeNames: ["gpii.ul.api.tests.harness"],
    templateDirs: ["%gpii-user-review-widget/src/templates", "%gpii-ul-api/src/templates", "%gpii-express-user/src/templates", "%gpii-json-schema/src/templates"],
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
                            content: ["%gpii-user-review-widget/src", "%gpii-ul-api/src"]
                        }
                    },
                    nm: {
                        options: {
                            content: "%gpii-user-review-widget/node_modules"
                        }
                    }
                }
            }
        }
    }
});
