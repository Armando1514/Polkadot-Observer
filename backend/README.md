# Backend Monitor App


## Docker Image

To run the docker image, go with the terminal in the backend folder and type:

```docker image build -t backend:v1 .```

```docker tag backend:v1 <your-repository>/backend:v1```

```docker tag backend:v1 <your-repository>/backend:latest```

```docker run -p 3001:3001 <your-repository>/backend:latest ```

Now you can access the backend on http://localhost:3001/

## Swagger
There is a file called openapi.yaml, you can use this website: https://editor.swagger.io/ to read the specifications of the APIs.

## E2E Tests

You first need to run an instance of mongodb locally,
after you can run ```npm run test:e2e```