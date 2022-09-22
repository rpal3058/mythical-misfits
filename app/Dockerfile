FROM --platform=linux/x86-64 node:14-alpine

RUN echo Moving into MythicalMisfitsService Folder ..
WORKDIR /MythicalMisfitsService

RUN echo Copy the package json into MythicalMisfitsService Folder ..
COPY package.json ./ 

RUN echo Install dependencies...
RUN npm install

RUN echo Copying the Mythical Misfits director into a service directory of the image.
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]


