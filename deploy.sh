#!/usr/bin/env bash

export ENVIRONMENT=${1}

for f in ./deploy/tmpl/*.yaml
do
  envsubst < $f > "./deploy/.generated/$(basename $f)"
done

kubectl apply -f ./deploy/ -f ./deploy/.generated/
