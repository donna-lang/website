---
title = "Tuples"
slug = "docs/tuples"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "tuples"]
weight = 14
lead = "Use tuples for small fixed groups of values."
category = "Language"
---

# Tuples

Tuples group a fixed number of values without defining a named type.

```donna
fn user() -> #(String, Int):
  #("Donna", 1)
```

They are useful for small internal values.

```donna
fn package_info() -> #(String, String):
  #("donna_stdlib", "0.1.1")
```

Tuples can also be matched in `case`.

```donna
fn describe(pair: #(String, Int)) -> String:
  case pair:
    #(name, count) -> name
```

Use a custom type when the data deserves names. Tuples are sharp tools. Do not juggle them for attention.

