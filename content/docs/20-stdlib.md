---
title = "Standard Library"
slug = "docs/stdlib"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "stdlib", "packages"]
weight = 20
lead = "Donna's standard library is a separate package with its own docs and releases."
category = "Toolchain"
---

# Standard Library

Donna's standard library lives in a separate package:

```text
donna_stdlib
```

It provides practical modules for strings, lists, ints, files, shell commands, time, options, results, dictionaries, booleans, floats, and more.

Add it through `donna.toml`.

```toml
[dependencies]
stdlib = { git = "https://github.com/donna-lang/donna_stdlib" }
```

Then import the modules you use.

```donna
import donna/string
import donna/list

pub fn main() -> Nil:
  let title = string.to_slug("Hello Donna")
  let total = list.sum([1, 2, 3])
  echo title
  echo string.from_int(total)
```

The [standard library docs](https://donna-lang.github.io/donna_stdlib/docs.html) live separately.

Keeping stdlib separate lets it release independently. The compiler should not have to change every time a helper function gets better.
