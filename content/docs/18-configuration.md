---
title = "Configuration"
slug = "docs/configuration"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "toml", "configuration"]
weight = 18
lead = "Configure Donna projects with donna.toml."
category = "Toolchain"
---

# Configuration

Donna projects use `donna.toml` for metadata and dependencies.

```toml
name = "hello"
version = "0.1.0"
author = "Nikolas"
description = "A small Donna project"
```

Dependencies are declared in TOML tables.

```toml
[dependencies]
donna = { git = "https://github.com/donna-lang/donna_stdlib", version = ">=0.1.0 and <1.0.0" }

[dev-dependencies]
unittest = { git = "https://github.com/donna-lang/unittest", tag = "v0.1.1" }
```

Local dependencies are useful while building packages side by side.

```toml
[dependencies]
mustache = { path = "../mustache" }
```

Git dependencies can use `version`, `tag`, `branch`, or `rev`. Prefer `version` for published packages and `rev` when you need a build to be perfectly repeatable.

Project metadata can power generated docs, badges, package pages, and release tooling. Keep it accurate. A clean `donna.toml` is a small thing that prevents a lot of nonsense later.
