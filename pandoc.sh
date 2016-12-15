#!/bin/bash

#pandoc -S -w html --from markdown-markdown_in_html_blocks+raw_html  -o readme.pdoc.html docs/0000-toc.md \

pandoc -S -w html --from markdown_strict  -o readme.pdoc.html docs/0000-toc.md \
  docs/0100/0100-introduction.md \
  docs/0200/0200-components.md \
  docs/0200/0210-vargrid.md \
  docs/0200/0220-vartab.md \
  docs/0999/0999-conclusion.md 

pandoc -S -t markdown_github -o README.md docs/0000-toc.md \
  docs/0100/0100-introduction.md \
  docs/0200/0200-components.md \
  docs/0200/0210-vargrid.md \
  docs/0200/0220-vartab.md \
  docs/0999/0999-conclusion.md 


  pandoc -S -w html --from markdown_strict  -o docs/docs.main.html docs/docs.main.template.md readme.pdoc.html 
	  