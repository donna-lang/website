---
title = "Functions"
slug = "docs/functions"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "functions"]
weight = 8
lead = "Functions are typed, indentation-based, and return their last expression."
category = "Language"
---

# Functions

Functions use `fn`, typed parameters, and a return type.

```donna
fn greet(name: String) -> String:
  "Hello " <> name
```

The last expression is the return value.

```donna
fn double(value: Int) -> Int:
  value * 2
```

Public functions use `pub fn`.

```donna
pub fn main() -> Nil:
  echo greet("Donna")
```

Donna uses indentation for blocks. No braces. No extra ceremony.

Small functions are a good Donna habit. Give the thing a name, make the type clear, move on.

