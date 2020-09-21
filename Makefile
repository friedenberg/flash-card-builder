
FILES_IMAGES := $(wildcard images/*.jpg) $(wildcard images/*.png)
FILES_JS := $(wildcard js/*.js)
FILES_CSS := $(wildcard css/*.css)
FILES_FONTS := $(wildcard fonts/*.woff2)

FILES_PREFIX := $(notdir $(FILES_JS) $(FILES_CSS) $(FILES_FONTS))
FILES_NO_PREFIX := $(notdir $(FILES_IMAGES))

.PHONY: all
all: $(addprefix _,$(FILES_PREFIX)) $(FILES_NO_PREFIX);

_%.css: css/%.css
	cp '$<' '$@'

_%.js: js/%.js
	cp '$<' '$@'

_%.woff2: fonts/%.woff2
	cp '$<' '$@'

%.jpg: images/%.jpg
	cp '$<' '$@'

%.png: images/%.png
	cp '$<' '$@'

.PHONY: clean
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
