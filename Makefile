
FILES_IMAGES := $(wildcard images/*.jpg) $(wildcard images/*.png)
FILES_JS := $(wildcard js/*.js)
FILES_CSS := $(wildcard css/*.css)
FILES_FONTS := $(wildcard fonts/*.woff2)

FILES_ALL := $(FILES_IMAGES) $(FILES_JS) $(FILES_CSS) $(FILES_FONTS)

.PHONY: all
all: $(notdir $(FILES_ALL));

%.css: css/%.css
	cp $< $@

%.js: js/%.js
	cp $< $@

%.woff2: fonts/%.woff2
	cp $< $@

%.jpg: images/%.jpg
	cp $< $@

%.png: images/%.png
	cp $< $@

.PHONY:
clean:
	find . -maxdepth 1 -type f \
		\( \
		-iname '*.css' -o \
		-iname '*.js' -o \
		-iname '*.jpg' -o \
		-iname '*.png' -o \
		-iname '*.woff2' \
		\) \
		-delete
