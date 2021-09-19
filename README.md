# Vercel Template

![Service-Template](https://user-images.githubusercontent.com/39351850/133937038-471eacb3-d3e7-4f49-b211-f2679ada53cd.png)

## Description

This is a Template to create a Custom Service in Vercel

## Guide

### Create a new Repository
- When you are creating a new Repository, choose this as a template
- As name choose `{serviceName}-service`, for example `example-service`

### Replace

- `{serviceName}`: For the Service Name
- `{serviceDescription}`: For the Service Description
- `{serviceBanner}`: For the Service Image Banner

> :warning: If you are not me, or you do not create in my account may change my username for yours

### Readme

- Delete this file
- Change `README.tpl` for `README.md`

### Vercel

- Create a new Proyect in Vercel
- Import the new Repository
- Choose create as your own personal proyect
- Continue
- Wait to deploy

### Setup before Code

- Run `npm i`
    - Install every depency
- Run `npm run vercel-login`
    - Can enter your Github account for logging
- Run `npm start`
    - If is the first time, Vercel-CLI will try to config locally the Service.
    - It will start the local server (to develop), in `https://localhost:3000`
    - Some examples are already setup
        - `https://localhost:3000` -> Will Show a HTML
        - `https://localhost:3000/api/message` -> Will try to use an API
        - `https://localhost:3000/api/message/100` -> Will try to use an API with ID
        - Any other will trigger "not found" API

### Develop
You are ready to start coding,

This template has:
- Testing
    - [Mocha](https://www.npmjs.com/package/mocha)
    - [Sinon](https://www.npmjs.com/package/sinon)
- Code Quality
    - [EsLint](https://www.npmjs.com/package/eslint) with AirBnB v13 plugin
    - [Istanbul](https://www.npmjs.com/package/nyc)
- Code
    - [Handlebars](https://www.npmjs.com/package/handlebars) - For Help to Render HTML
    - [Vercel](https://www.npmjs.com/package/vercel) - For deploys and local develop
    - [Verce-Serverless-Api](https://www.npmjs.com/package/vercel-serverless-api) - To Hanlde Serverless Function easiest