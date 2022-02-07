
FROM nginx:stable
COPY . .
EXPOSE 8080
CMD [ "http-server", "dist" ]














