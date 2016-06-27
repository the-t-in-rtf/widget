/*

    Expose our content to Fluid components that can use `fluid.module.resolvePath`.

 */
"use strict";
var fluid = require("infusion");
fluid.module.register("gpii-user-review-widget", __dirname, require);