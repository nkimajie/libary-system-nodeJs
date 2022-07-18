const express = require('express');

const customResponse = Object.create(express().response, {
    data: {
        value(data, status = true) {
            return this.type('json').json({
                status,
                data,
            });
        },
    },
    error: {
        value(error, message = 'An error occured') {
            return this.json({
                message,
                statusCode: -3,
                status: false,
                error,
            });
        },
    },
    errorMessage: {
        value(message = 'API response message') {
            return this.json({
                message,
                status: false,
                statusCode: 1,
            });
        },
    },
});

module.exports = customResponse;