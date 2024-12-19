# TCG Sample Catalog

## Introduction

This repository shows a Trading card game catalog for a code challenge.

It is required to serve in a single endpoint a the search feature of cards of any of the following games:

1. MTG
2. Lorcana

This repository presents a proposal to provide the endpoint with the following considerations in mind:

1. Extensibility: It's fairly easy to add new game and be able to search for its cards
2. Flexibility: The endpoint is fairly flexible, allowing complex queries for all the card fields.

This approach is presented not as a real world scenario, but trying to be as close as a real world service would look like. For example, no authorization was implemented, in a real world application, a middleware would act as a guard validating JWT tokens.

Having said that, the architecture is really close to the one you colud find in a real world backend.

## Setup

1. Clone this project: `git clone https://github.com/notaphplover/tcg-catalog.git && cd tcg-catalog`.
2. Copy env file from example env: `cp .env.example .env`.
2. Install dependencies and compile source code: `pnpm i && pnpm run build`.
3. Launch docker services: `docker compose -f ./docker-compose.yml up`.
4. Launch the ingest script: `pnpm run data:ingest`.
5. Launch the server: `pnpm run serve`.

After following these steps, the REST API should be available at `http://localhost:3001`.

Swagger docs should be available at `http://localhost:8080`

You can try some sample queries like the following one:

```bash
curl --location 'http://127.0.0.1:3001/v1/cards/searches' \
--header 'Content-Type: application/json' \
--data '{
    "inkCost": {
        "kind": "or",
        "filters": [{
            "kind": "value",
            "value": 9
        }, {
            "kind": "value",
            "value": 10
        }]
    },
    "limit": 100
}'
```

Which would be equivalent to:

```bash
curl --location 'http://127.0.0.1:3001/v1/cards/searches' \
--header 'Content-Type: application/json' \
--data '{
    "inkCost": {
        "kind": "range",
        "max": {
            "exclude": false,
            "value": 10
        },
        "min": {
            "exclude": false,
            "value": 9
        }
    },
    "limit": 100
}'
```

Search filters are documented in the OpenApi docs as well
