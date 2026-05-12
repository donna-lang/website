---
title = "First Project"
slug = "docs/first-project"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "projects"]
weight = 3
lead = "Create a project, run its generated test, and start from something that already works."
category = "Getting Started"
---

# First Project

Create a project:

```sh
donna new hello
cd hello
```

New projects include source code, project metadata, a demo test, and a GitHub Actions workflow. The goal is simple: you should be able to run the test suite immediately.

Run the tests:

```sh
donna test
```

Run the app:

```sh
donna run
```

A minimal app looks like this:

```donna
pub fn main() -> Nil:
  echo "Hello from Donna"
```

Libraries do not need `main`. Apps do. If you try to run a library, Donna should say that clearly. Precision matters.

