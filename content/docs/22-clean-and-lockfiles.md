---
title = "Clean and Lockfiles"
slug = "docs/clean-and-lockfiles"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "cli", "packages"]
weight = 22
lead = "Remove generated files and refresh dependency revisions intentionally."
category = "Toolchain"
---

# Clean and Lockfiles

Donna writes build output, docs output, and dependency lock data during normal project work.

Remove generated build output:

```sh
donna clean
```

Remove generated docs:

```sh
donna clean --docs
```

Remove the lockfile:

```sh
donna clean --lock
```

Remove all generated output Donna knows about:

```sh
donna clean --all
```

Use `--lock` only when you want Donna to resolve dependency revisions again. Cleaning should be deliberate, not a panic button.

