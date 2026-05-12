---
title = "Numbers"
slug = "docs/numbers"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "numbers"]
weight = 10
lead = "Use integers, floats, readable number formats, and explicit conversions."
category = "Language"
---

# Numbers

Donna has `Int` and `Float`.

```donna
let count = 3
let ratio = 0.5
```

Use `Int` for whole numbers and `Float` for decimal values.

```donna
fn next(value: Int) -> Int:
  value + 1

fn half(value: Float) -> Float:
  value /. 2.0
```

Underscores can group digits.

```donna
echo 1_000_000
echo 10_000.01
```

Integer literals can be binary, octal, or hex.

```donna
echo 0b00001111
echo 0o17
echo 0xF
```

Those all print the same value: `15`.

Floats support scientific notation.

```donna
echo 7.0e7
echo 3.0e-4
```

Convert numbers to strings with the standard library when you need text output.

```donna
import donna/string

pub fn main() -> Nil:
  let total = 1 + 2 + 3
  echo string.from_int(total)
```

