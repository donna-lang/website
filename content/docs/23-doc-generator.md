---
title = "Documentation Generator"
slug = "docs/documentation-generator"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "docgen"]
weight = 23
lead = "Generate package docs from Donna module and API comments."
category = "Toolchain"
---

# Documentation Generator

Donna can generate package documentation from source comments.

Use `////` for module comments.

````donna
//// String helpers for examples and tests.
////
//// ```donna
//// import donna/string
////
//// pub fn main() -> Nil:
////   echo string.to_slug("Hello Donna")
//// ```
````

Use `///` for public API comments.

````donna
/// Convert a title into a URL-friendly slug.
///
/// ```donna
/// let slug = string.to_slug("Hello Donna")
/// ```
pub fn to_slug(title: String) -> String:
  title
````

Generate docs from a package project:

```sh
donna docs
```

Generated docs include package metadata, module comments, public API entries, Markdown examples, copy buttons, and Donna syntax highlighting.

Docs are part of the product. If an API is public, it deserves a good introduction. Donna would not walk into a room unprepared.

