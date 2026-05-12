---
title = "Lists and Pipelines"
slug = "docs/lists-and-pipelines"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "lists"]
weight = 13
lead = "Use lists for sequences and pipes for readable transformations."
category = "Language"
---

# Lists and Pipelines

Lists use square brackets.

```donna
let names = ["Nikolas", "Donna"]
let numbers = [1, 2, 3]
```

List patterns can pull out the head and tail.

```donna
fn first_or_default(items: List(String)) -> String:
  case items:
    [] -> "none"
    [head, .._] -> head
```

The pipe operator sends a value into the next function call.

```donna
import donna/string

fn join_greetings(names: List(String)) -> String:
  string.join(names, ", ")

pub fn main() -> Nil:
  ["Nikolas", "Donna"]
  |> join_greetings
  |> echo
```

Use pipes when each step has a clear name. If the direct function call is easier to read, use that. Good taste wins.

