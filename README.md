# react-universal-ts-boilerplate


## Table of Contents

* Start
* [Npm scripts] (docs / npmScripts.md)
* [environment variables] (docs / globalVariables.md)
* [Project structure] (docs / environmentStructure.md)
* [Module structure] (docs / module.md)
* Localization
* [Testing] (docs / testing.md)
* [Lintting and formatting] (docs / codeStyle.md)
* Redux
* Apollo
* Recommendations

## Start

* npm install
* npm run start: ssr: dev or npm run start: csr: dev


# Recommendations for work

* router configuration, constants not related to redux, to be placed only in `src / shared`
* gql query, mutation and type interfaces to be placed in `src / shared`
* how to describe requests, types and mutations read [here] (https://www.apollographql.com/docs/react/recipes/static-typing)
* to update packages in the project, you can use the utility [npm-check] (https://github.com/dylang/npm-check)
*

## mock client apollo

to be continued ...

## Styling through styled-components + styled-system

In the project for styling use:

* 💅 [styled-components] (https://www.styled-components.com/) - css-in-js
* [styled-system] (https://styled-system.com/)

to be continued ...

## Beginning of work

1. determine from the layouts how many layouts you have, and to what contexts they belong:
root, auth, admin, etc.
2. In the configuration of styles, write down everything: colors, shadows, borders, linear gradients, determine in advance
different transition. The theme config is in [src / styles / StyledThemeProvider.tsx] (src / styles / StyledThemeProvider.tsx)
3. In the stylesheet, write down all the options and put them here [src / styles / variants] (src / styles / variants), make out
Components:
    1. buttons (visual design and dimensions otdulno)
    2. text fields (visual design and dimensions otdulno)
    3. components of the card (only visual)
    4. text options (sorted by headers from h1 to the minimum title of the project
    and other types of text, if the text differs only in the whole but the dimensions are the same
    also a separate option)
    5. You can write some custom stuff here, but this is up to you.
4. create modules and routes for your pages, define layouts for them in advance
5. in the config of the router, submit your markup for your layouts, the config of the router in [src / shared / config]
   
   
## ca-config.json

The config describes global variables for webpack and applications.
The structure of the config is as follows:

[operation mode (csr, ssr)]: {
  [script name]: {
    [variable name]: [value]
  }
}

For each script there is a list of predefined variables:

* "NODE_ENV" - the launch mode of the project's reagent, has two states: "production", "development"
* "hmr" - responsible for hot-module-replacement while developing
* "ssr_fetch" is an auxiliary variable for development, with its help you can disable the request call on the server, do not forget to use it in requests that you want to disable
* "server_entry" - the path to the entry point for the server
* "client_entry" - the path to the entry point for the client
* "output" - the name of the directory with the final build
* "endpoint_server" - endpoint address where requests from the server will go
* "endpoint_client" - endpoint address where browser requests will go
* "port" - the port on which the application is running
* "defaultLocale" is the default language
* "apolloFaker" - enable faker as apollo-client, useful when starting work when the backend is not yet ready
