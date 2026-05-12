---
title = "Packages"
slug = "docs/packages"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "packages"]
weight = 19
lead = "Donna projects can use local packages and Git dependencies."
category = "Toolchain"
---

# Packages

Donna packages are regular projects with metadata and source files.

```toml
name = "hello"
version = "0.1.0"
author = "Your Name"
```

Use Git dependencies for published packages.

```toml
[dependencies]
donna = { git = "https://github.com/donna-lang/donna_stdlib", version = ">=0.1.0 and <1.0.0" }
unittest = { git = "https://github.com/donna-lang/unittest", version = ">=0.1.0 and <1.0.0" }
```

Use local path dependencies while developing packages together.

```toml
[dependencies]
markdown = { path = "../markdown" }
```

When you need a specific Git state, pin it directly.

```toml
[dependencies]
markdown = { git = "https://github.com/NikolasSkyl/markdown", rev = "a1b2c3d" }
```

Donna also accepts `tag` and `branch`, but `version` is the nicest public contract and `rev` is the strictest one. Use the one that says what you mean.

Donna writes a lockfile so later builds use the same resolved dependency revisions.

Refresh dependency revisions intentionally:

```sh
donna clean --lock
```

Packages should be boring to consume. That is a compliment.
