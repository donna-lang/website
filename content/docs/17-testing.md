---
title = "Testing"
slug = "docs/testing"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "testing"]
weight = 17
lead = "Use Donna's test runner and unittest package to keep projects honest."
category = "Toolchain"
---

# Testing

Run tests with:

```sh
donna test
```

New projects include a demo test, so the suite can run immediately.

Tests usually return assertion results from `unittest/should`.

```donna
import unittest/should

pub fn greeting_test() -> String:
  should.equal_string("Hello Donna", "Hello Donna")
```

Add context when a failure needs a little explanation.

```donna
import unittest/should

pub fn retry_count_test() -> String:
  should.because(should.equal_int(3, 3), "checking retry count")
```

The runner prints timing and a failure summary. Passing tests should be quiet. Failed tests should tell you exactly where to look.

