import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import {App} from './App';
import * as recurCheckPayDay from "./utils/recurCheckPayDay.js";

let server: any = new App().expressApp;
server.listen(process.env.PORT || 8080);
console.log("Server is running on port: 8080 or Azure port.");
server.on('listening', function () {
    recurCheckPayDay();
});
