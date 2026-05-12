---
title = "Types and Patterns"
slug = "docs/types-and-patterns"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "types"]
weight = 12
lead = "Use built-in types, custom variants, and case expressions."
category = "Language"
---

# Types and Patterns

Donna has the usual everyday types:

- `Int`
- `Float`
- `String`
- `Bool`
- `Nil`
- `List(a)`

Custom types use constructors.

```donna
pub type Status:
  Draft
  Published
```

Use `case` to branch on values.

```donna
fn status_label(status: Status) -> String:
  case status:
    Draft -> "draft"
    Published -> "published"
```

Constructors can carry values.

```donna
pub type Page:
  Home
  Article(title: String, slug: String)
```

Pattern matching lets each branch name the values it needs.

```donna
fn page_title(page: Page) -> String:
  case page:
    Home -> "Home"
    Article(title, _) -> title
```

Use custom types when the shape matters. A named type is often clearer than a clever tuple. Donna is practical, not cryptic.

