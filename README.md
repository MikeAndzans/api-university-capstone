# API-University capstone project

## Setup
For initial setup run `npm run init`, that will install npm dependencies, initialize & seed sqlite and build project

## Launch
To launch project run `npm run start`

## TODOS
* move graphql schema to separate schema file
* use graphql-codegen for types/typedefs generation
* move resolvers chaining logic from `resolvers/index.ts`
* move prisma client to resolvers context
* add proper error handling
* add descriptions(docstrings) to schema

## KNOWN ISSUES
* Some mutation actions will return generic graphql errors because of non existent error handling in resolvers logic (for example, trying to modify user that doesn't exist)
