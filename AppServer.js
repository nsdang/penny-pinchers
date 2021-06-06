"use strict";
exports.__esModule = true;
var App_1 = require("./App");
var recurCheckPayDay = require("./utils/recurCheckPayDay.js");
var server = new App_1.App().expressApp;
server.listen(process.env.PORT || 8080);
console.log("Server is running on port: 8080 or Azure port.");
server.on('listening', function () {
    recurCheckPayDay();
});
