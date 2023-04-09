# Energy Consumption Form API

This API provides 3 RESTful endpoints:

- GET /form - returns the form structure
- GET /submissions - returns all submitted forms
- POST /submissions - saves a submission. Expects application/json format.

## Setup

To run the api and test the endpoints locally:

1. Set up a Postgres database with name `template1` and a user of username `root` and password `admin` OR update the corresponding values in [datasource.ts](src/infra/datasource.ts). The user requires public schema access.
2. In the root directory of this repository, run `npm i` and then `npm run start`
3. Run sample requests using the [Postman collection](postman_collection.json)
4. To run tests, run `npm run tests`

## Structure

The repo broadly follows a Hexagonal Architecture structure to separate core domain logic from api details and integration setup.

```
|__src
| |__infra           # configuration
| |__api             # external layer
| | |__routes
| |__domain          # core domain logic
| | |__helpers
| | |__services
| | |__entities
```

## Core Improvements To Make

1. Externalise configuration to enable app to run in different environments e.g. production db
1. Improve portability and local setup time by dockerizing the application
1. Add security - authentication/authorization and CORS, ensure https only
1. Improve isolation and testability with dependency injection
1. Add Swagger to provide out-of-the-box documentation for the endpoints
1. Extend endpoints with GET /submissions/{submissionId} and potentially PUT / DELETE
1. Separate test types (unit vs integration vs e2e) and enforce test coverage
