# Attending [to] Futures

A website for the confernce Attenting [to] Futures.

## Table of Contents
	- [Install](#install)
	- [Update](#update)

## Install

Download to your project directory:

```sh
git clone git@github.com:cccccccccccccccccnrd/attending-to-futures.git
npm install
```

## Update
Make sure your SSH key is added to the server.

Commit your changes:
```sh
git add .
git commit -m "what did you change?"
git push
```

Then deploy:
```sh
ssh design@attendingtofutures.de
cd attending-to-futures
git pull
pm2 restart atf-client
```