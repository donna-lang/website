---
title = "Native Interop"
slug = "docs/native-interop"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "ffi"]
weight = 21
lead = "Bind C libraries when native code is the right tool."
category = "Toolchain"
---

# Native Interop

Donna can call into C through FFI packages. This is useful when a mature C library already does the job well.

Good FFI packages keep the Donna API small and clear.

```donna
import markdown

pub fn main() -> Nil:
  echo markdown.to_html("# Hello Donna")
```

Put C source files in the package's `ffi/` directory.

```text
my_package/
  donna.toml
  src/
    my_package.donna
  ffi/
    my_package_ffi.c
    my_package_ffi.h
```

The Donna API lives in `src/`. The C wrapper lives in `ffi/`. Everybody knows where they stand.

For portable FFI:

- Use standard C headers when possible.
- Keep platform-specific code behind small wrappers.
- Avoid POSIX-only calls unless the package documents that limitation.
- Test Linux, macOS, and Windows if the package claims to support them.

FFI is powerful. Use it like Donna Paulsen uses a sentence: direct, sharp, and only when it matters.

