# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16 as build

# Set the working directory
WORKDIR /usr/local/app
# COPY package.json /app
COPY package.json  /usr/local/app/
# Install all the dependencies
 RUN npm install
# Add the source code to app COPY package.json /app
COPY ./ /usr/local/app/
# Generate the build of the application
RUN npm run build
# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest
# Copy the build output to replace the default nginx contents.C:\Users\ThinkPad\Desktop\Angular & Spring boot\AngularauthUI\dist\AngularauthUI
COPY --from=build /usr/local/app/dist/AngularauthUI /usr/share/nginx/html
# Expose port 80
EXPOSE 80