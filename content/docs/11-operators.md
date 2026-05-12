---
title = "Operators"
slug = "docs/operators"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "operators"]
weight = 11
lead = "Use integer operators, float operators, comparison, concatenation, and pipes."
category = "Language"
---

# Operators

Integer arithmetic uses familiar operators.

```donna
let total = 1 + 2
let rest = 10 - 3
let doubled = 4 * 2
let half = 8 / 2
let remainder = 10 % 3
```

Float arithmetic uses dot operators. It keeps integer math and floating-point math visually distinct.

```donna
let total = 1.0 +. 2.0
let rest = 10.0 -. 3.0
let doubled = 4.0 *. 2.0
let half = 8.0 /. 2.0
```

Integer comparisons use the usual comparison operators.

```donna
fn is_large(value: Int) -> Bool:
  value > 10
```

Float comparisons use dot operators too.

```donna
fn is_large_float(value: Float) -> Bool:
  value >. 10.0

fn is_small_float(value: Float) -> Bool:
  value <=. 1.0
```

String concatenation uses `<>`.

```donna
fn path(slug: String) -> String:
  "/docs/" <> slug
```

The pipe operator `|>` sends a value into the next function.

```donna
import donna/string

pub fn main() -> Nil:
  "Language Tour"
  |> string.to_slug
  |> echo
```

