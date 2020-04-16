"use strict";
const reset = "\u001b[0m";

const logWrap = fn => {
    if ( "production" !== process.env.NODE_ENV && "function" === typeof fn ) {
        return fn;
    }

    return () => {};
};

exports.red = (text) => {
    return `\u001b[31m${text}${reset}`;
};

exports.green = (text) => {
    return `\u001b[32m${text}${reset}`;
};

exports.yellow = (text) => {
    return `\u001b[33m${text}${reset}`;
};

exports.white = (text) => {
    return `\u001b[37m${text}${reset}`;
};

exports.log = (message) => {
    console.log(this.white(message));
};

exports.error = (message) => {
    console.error(this.red(message));
};

exports.success = (message) => {
    console.log(this.green(message));
};

exports.notice = (message) => {
    console.warn(this.yellow(message));
};

exports.logDev = logWrap(this.log);

exports.errorDev = logWrap(this.error);

exports.successDev = logWrap(this.success);

exports.noticeDev = logWrap(this.notice);

exports.logger = (request, response, next) => {
    this.noticeDev(`NEW REQUEST: ${request.method} | ${request.path} | ${request.url.split("?").pop()}`);
    next();
};