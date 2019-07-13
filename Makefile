NAME	:= amerrill/scrabble-words-frontend
TAG	:= $$(git log -1 --pretty=%H)
IMG	:= ${NAME}\:${TAG}
LATEST	:= ${NAME}\:latest
LOCAL_PORT	:= 3000
DOCKER_PORT	:= 80
 
build:
	@docker build -t ${IMG} .
	@docker tag ${IMG} ${LATEST}

run:
	@docker run -v ${PWD}:/app -v /app/node_modules -p 3000:80 ${LATEST}

push:
	@docker push ${NAME}