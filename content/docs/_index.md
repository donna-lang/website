---
title = "Language Tour"
slug = "docs"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "tour"]
weight = 1
lead = "A friendly tour through Donna, from your first command to packages and FFI."
category = "Getting Started"
---

# Language Tour

Donna is a functional, statically typed, self-hosted programming language that compiles to native binaries through [QBE](https://c9x.me/compile/) and a C compiler.

That is the serious answer. The shorter one is this: Donna tries to stay small, readable, and practical. No drama. Donna Paulsen would approve.

```donna
pub fn main() -> Nil:
  echo "Hello Donna"
```

This tour starts with installation and your first project, then moves through the language one piece at a time. After that, we get into tests, packages, the standard library, docs generation, and native interop.

You do not need to learn everything at once. Start with a file, run it, and let the language introduce itself.

