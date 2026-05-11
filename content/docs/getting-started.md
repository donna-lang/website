---
title = "Getting Started"
slug = "docs/getting-started"
date = "2026-05-11"
layout = "doc"
draft = false
tags = ["docs", "start"]
weight = 2
lead = "Install Donna, create a project, and run the first test."
category = "Getting Started"
---

# Getting Started

This first guide will walk through installing Donna, creating a project, and running the generated test suite.

```sh
donna new hello
cd hello
donna test
```

```donna
import donna/string

fn route(title: String) -> String:
  "/docs/" <> string.to_slug(title)

pub fn main() -> Nil:
  let path = route("Language Tour")
  echo path
```

More detail is coming soon.
