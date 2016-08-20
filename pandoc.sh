#!/bin/bash

pandoc -S -o readme.pdoc.html docs/0000-toc.md \
  docs/0100/0100-introduction.md \
  docs/0200/0200-components.md \
  docs/0200/0210-vargrid.md \
  docs/0999/0999-conclusion.md 

pandoc -S -o README.md docs/0000-toc.md \
  docs/0100/0100-introduction.md \
  docs/0200/0200-components.md \
  docs/0200/0210-vargrid.md \
  docs/0999/0999-conclusion.md 
