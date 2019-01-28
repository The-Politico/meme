.PHONY: build serve upload ship

build:
	bundle exec middleman build

serve:
	bundle exec middleman -p 4567

upload:
	aws s3 cp ./build s3://interactives.politico.com/interactives/2019/social-image-generator/ --recursive --acl=public-read

ship:
	make build
	make upload
