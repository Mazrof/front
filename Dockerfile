## First Stage
FROM node:lts-alpine3.20 as build

WORKDIR /build

COPY package*.json ./

RUN ["npm","install"]

COPY ./ ./

RUN ["npm","run","build"]


## Second Stage
FROM node:lts-alpine3.20 as production

WORKDIR /prod

## env variables
ENV NEXT_TELEMETRY_DISABLED=1

## Copying

COPY --from=build /build/.next ./.next

COPY --from=build /build/node_modules ./node_modules

COPY --from=build /build/package*.json ./

EXPOSE 3000

CMD ["npm","run","start"]