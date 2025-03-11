# Base image
FROM node:18.18.2-buster

# Set working directory
WORKDIR /usr/src/app

# Add build arguments

# Copy package.json, yarn.lock for dependency installation
COPY package.json ./

COPY yarn.lock ./

ARG ENV_TYPE

# Install dependencies
RUN npm install -g npm@10.5.0
RUN npm install -g cross-env

RUN yarn cache clean
RUN yarn config delete https-proxy
RUN yarn config delete proxy
RUN yarn install --peer --network-timeout 30000000

# Copy all required files
COPY . .

# Build Next.js app
RUN if [ "$ENV_TYPE" = "dev" ]; then \
      yarn build:dev; \
    else \
      yarn build; \
    fi


# Uncomment this line if you want to start the application when the container starts
# CMD [ "yarn", "start" ]
