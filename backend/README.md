# Backend Monitor App


## Docker Image

To run the docker image, go with the terminal in the backend folder and type:

```docker image build -t backend:v1 .```

```docker tag backend:v1 <your-repository>/backend:v1```

```docker tag backend:v1 <your-repository>/backend:latest```

```docker run -p 3001:3001 armando1514/backend:latest ```

Now you can access the backend on http://localhost:3001/

## E2E Tests

You first need to run an instance of mongodb locally,
after you can run ```npm run test:e2e```