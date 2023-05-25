# # Fetching the latest node image on apline linux
# FROM node:17-alpine AS builder


# # Declaring env
# ENV NODE_ENV production


# # Setting up the work directory
# WORKDIR /app


# # Installing dependencies
# COPY ./package.json ./
# RUN npm install


# # Copying all the files in our project
# COPY . .


# # Building our application
# RUN npm run build


# # Fetching the latest nginx image
# FROM nginx


# # Copying built assets from builder
# COPY --from=builder /app/build /usr/share/nginx/html


# # Copying our nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Create a new user with UID 10014
# RUN addgroup --gid 10014 choreo && \
#     adduser  --disabled-password  --no-create-home --uid 10014 --ingroup choreo choreouser
# # Set a non-root user
# USER 10014

# CMD [ "npm", "start" ]

# FROM node:18.13.0-alpine
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent
# RUN npm install react-scripts@5.0.1 -g --silent
# COPY . ./
# CMD ["npm", "start"]

FROM node:16-alpine as builder
        RUN npm install -g pnpm
        WORKDIR /app
        RUN npm install
        COPY . .
        RUN if [ -f "./package-lock.json" ]; then npm install; \
            elif [ -f "./yarn.lock" ]; then yarn; \
            elif [ -f "./pnpm-lock.yaml" ]; then pnpm install;fi
        COPY . .
        RUN npm run build

        FROM nginxinc/nginx-unprivileged:stable-alpine-slim

        # Update nginx user/group in alpine
        ENV ENABLE_PERMISSIONS=TRUE
        ENV DEBUG_PERMISSIONS=TRUE
        ENV USER_NGINX=10015
        ENV GROUP_NGINX=10015

        COPY --from=builder /app/build /usr/share/nginx/html/
        USER 10015
        EXPOSE 8080
        CMD ["nginx", "-g", "daemon off;"]