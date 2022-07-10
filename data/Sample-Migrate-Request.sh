#!/bin/bash

REQUEST_URL="https://git.4lch4.io/api/v1/repos/migrate?access_token=$GITEA_TOKEN"

curl -X 'POST' $REQUEST_URL \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "auth_password": "string",
  "auth_username": "4lch4",
  "clone_addr": "https://github.com/4lch4/argus",
  "description": "A CLI utility for managing numerous SSH keys.",
  "issues": true,
  "labels": true,
  "milestones": true,
  "private": false,
  "pull_requests": true,
  "releases": true,
  "repo_name": "Argus",
  "repo_owner": "4lch4",
  "service": "github",
  "wiki": true
}'
