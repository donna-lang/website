---
title = "Check, Format, Build, Run"
slug = "docs/check-format-build-run"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "cli"]
weight = 5
lead = "The commands you will use most while developing Donna projects."
category = "Getting Started"
---

# Check, Format, Build, Run

Format source files:

```sh
donna format
```

Check the project without producing a final executable:

```sh
donna check
```

Build the project:

```sh
donna build
```

Run the app:

```sh
donna run
```

Run the test suite:

```sh
donna test
```

Use `check` while writing code, `test` when behavior matters, and `build` when you want the binary. Donna keeps these separate because different questions deserve different answers.

