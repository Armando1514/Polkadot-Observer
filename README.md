# Polkadot Observer

## Architecture Overview

![first architectural sketch](./doc/img/first-architectural-sketch.jpg)
## Run On K8S Locally
- You first need to install Ingress-Nginx-Controller https://kubernetes.github.io/ingress-nginx/deploy/#quick-start
- kubectl apply -f ./k8s
- WAIT A MINUTE OR MORE, THE SERVICES NEED TO START (It requires more time if is the first time you have installed Ingress-Nginx-Controller ).
- Now if you have docker desktop you can access localhost:80 and see the dashboard otherwise type minikube ip to retrieve the IP and type it in you browser. If doesn't work, try to restart the cluster or docker desktop.
## Style Guides

- [Git style guide](./doc/style/git-style-guide.md)
- [Ember style guide](./doc/style/ember-style-guide.md)
- [General javascript style guide](./doc/style/ember-style-guide.md)

