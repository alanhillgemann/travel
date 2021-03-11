# Travel App Project

## Table of Contents

* [About](#about)
* [Languages](#languages)
* [Functionality](#functionality)
* [Dependencies](#dependencies)
* [Installation] (#installation)

## About

This project required me to build out a travel app that obtains a desired trip location & date from the user and displays weather and an image of the location using information obtained from external APIs.

## Languages

* JavaScript
* HTML
* CSS

## Functionality

Create Travel server:

* POST /trip API to obtain trip image and weather results from GeoNames, WeatherBit and Pixabay APIs
* Serve Travel website
* Serve default image when Pixabay API returns no images
* Access GeoNames, WeatherBit and Pixabay API keys via local .env file
* Log API errors to console

Create Travel website:

* Post trip to Travel server
* Update trip image and weather results on page
* Prevent sending multiple requests at once
* Cache website for offline access
* Show friendly error message on missing and invalid fields or network failure


## Dependencies

* Node.js
* NPM
    * @babel/core
    * @babel/preset-env
    * babel-loader
    * body-parser
    * clean-webpack-plugin
    * cors
    * css-loader
    * css-minimizer-webpack-plugin
    * dotenv
    * express
    * file-loader
    * html-webpack-plugin
    * jest
    * mini-css-extract-plugin
    * node-fetch
    * node-sass
    * sass-loader
    * style-loader
    * supertest
    * webpack-cli
    * webpack-dev-server
    * webpack
    * workbox-webpack-plugin


## Installation

Dependencies:

* $ npm install

Development mode:

* $ npm run build-dev

Production mode:

* $ npm run build-prod
* $ npm run start

Test:

* $ npm run test

Browser:

* http://localhost:8081

