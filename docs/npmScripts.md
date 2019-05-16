# npm scripts

### client side render

* build: csr: prod - build the project in production mode
* build: csr: dev - build a project in development mode
* start: csr: prod - start of the project in production mode for development with hmr
* start: csr: dev - build a project in development mode for development with hmr
* start: csr: server - launch the project build, start the usual express server

### server side render

* build: ssr: prod - build the project in production mode
* build: ssr: dev - build a project in development mode
* start: ssr: prod - start of the project in production mode for development with hmr
* start: ssr: dev - build a project in development mode for development with hmr
* start: ssr: server - launch the project build

### testing

* test - run unit tests of the project, the storybook library is excluded from the tests.
* test: snapshot: update - update project snapshots
* test: sb: snapshot - run a storybook library test using screenshots
* test: sb: snapshot: update - update screenshots of storybook library tests

### storybook

* storybook - launch in development mode
* build-storybook - build static build

### Lintting, formatting, code analysis

* lint: ts - lint ts code
* format - pretter code formatting
* check-merge-conflict - check for conflicts when merging commits / branches
* run-jscpd - search for copy-past code in a project
