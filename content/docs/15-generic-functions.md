---
title = "Generic Functions"
slug = "docs/generic-functions"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "generics"]
weight = 15
lead = "Write functions that work with more than one concrete type."
category = "Language"
---

# Generic Functions

Generic functions use type parameters such as `a`.

```donna
fn first(items: List(a)) -> a:
  case items:
    [head, .._] -> head
```

The same function can work with different element types.

```donna
let name = first(["Donna", "QBE"])
let number = first([1, 2, 3])
```

Generics are most useful for containers and small helpers.

```donna
fn identity(value: a) -> a:
  value
```

If the function needs behavior specific to a type, write the concrete function. Generics should reduce duplication, not hide intent.

