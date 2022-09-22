FROM nginx:1.19-alpine

COPY ./index.html /usr/share/nginx/html/index.html

COPY nginx/nginx.conf /etc/nginx/extra-conf.d/nginx.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]

