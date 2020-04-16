"use strict";

const isAccessTokenValid = accessToken => !!accessToken;

exports.notAllowedMethod = (request, response, next) => {
    response.status(405).json({
        status: "error",
        errorCode: 0,
        message: "Not allowed request! Please check request method and path!",
    });
};

exports.isTokenValid = (request, response, next, token) => {
    if ( isAccessTokenValid(token) ) { //TODO
        return next();
    }

    response.status(401).json({
        status: "error",
        errorCode: 9,
        message: "Unauthorized. Missing accessToken param.",
    });
};

exports.addCORSHeader = (request, response, next) => {
    // response.set("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Expose-Headers", "Content-Length,X-Foo,X-Bar");
    console.log("CORS");
    next();
}