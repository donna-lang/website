---
title = "Modules and Imports"
slug = "docs/modules-and-imports"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "modules"]
weight = 6
lead = "Donna keeps module calls explicit. If you use a module, import it."
category = "Language"
---

# Modules and Imports

Donna code is organized into modules. Import a module, then call its functions through the module name.

```donna
import donna/string

pub fn main() -> Nil:
  let title = string.to_slug("Hello Donna")
  echo title
```

That explicit `string.` is not noise. It tells the reader where the function came from.

If you call a module without importing it, Donna points at the problem.

```donna-error
error: undefined module
  ┌─ src/example.donna:2:15
  │
2 │   let title = string.to_slug("Hello Donna")
  │               ^^^^^^ `string` has not been imported

hint: add the missing import at the top of the file
```

Private code stays private by default. Add `pub` only when another module should use the value.

```donna
fn private_message() -> String:
  "inside this module"

pub fn public_message() -> String:
  private_message()
```
