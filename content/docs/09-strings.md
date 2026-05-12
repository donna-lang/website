---
title = "Strings"
slug = "docs/strings"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "strings"]
weight = 9
lead = "Work with text, concatenation, and escape sequences."
category = "Language"
---

# Strings

Strings use double quotes.

```donna
let name = "Donna"
```

Concatenate strings with `<>`.

```donna
fn greet(name: String) -> String:
  "Hello " <> name
```

Donna supports common escape sequences.

```donna
pub fn main() -> Nil:
  echo "line one\nline two"
  echo "tab\tseparated"
  echo "quote: \"Donna\""
```

Unicode escapes use `\u{...}`.

```donna
pub fn main() -> Nil:
  echo "\u{001b}[38;5;208morange text\u{001b}[0m"
```

The standard library adds helpers for day-to-day string work.

```donna
import donna/string

pub fn main() -> Nil:
  let slug = string.to_slug("Language Tour")
  echo slug
```

