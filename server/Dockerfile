FROM node:14.15-slim AS base
ENV NODE_ENV=production
ENV PATH=/app/node_modules/.bin/$PATH
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
# do apt-get here if needed
# RUN apt-get update && apt-get install -y --no-install-recommends PACKAGE && rm -rf /var/lib/apt/lists/*
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci && npm cache clean --force

FROM base AS development
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "run", "start:dev"]

FROM base AS source
COPY --chown=node:node . .

FROM source AS test
ENV NODE_ENV=development
COPY --from=development /app/node_modules /app/node_modules
CMD ["npm", "run", "test"]

FROM test AS audit
USER root
RUN npm audit --audit-level critical
ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

FROM source AS production
CMD ["npm", "start"]

