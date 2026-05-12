---
title = "Lambdas"
slug = "docs/lambdas"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "functions", "lambdas"]
weight = 16
lead = "Use anonymous functions when a tiny function value is clearer than a named helper."
category = "Language"
---

# Lambdas

Lambdas are anonymous functions. They use `fn(...) -> ...` inside an expression.

```donna
const double = fn(x: Int) -> x * 2
```

Lambdas can take no parameters.

```donna
const hello = fn() -> "Hello Donna"
```

They can take multiple parameters.

```donna
const add = fn(x: Int, y: Int) -> x + y
```

Lambda types use the same shape.

```donna
fn make_counter() -> fn(Int) -> Int:
  fn(value: Int) -> value + 1
```

Use lambdas for small local behavior. Use a named function when the behavior is reused, public, or worth documenting.

