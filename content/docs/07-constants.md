---
title = "Constants"
slug = "docs/constants"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "constants"]
weight = 7
lead = "Use const for reusable module-level values."
category = "Language"
---

# Constants

Constants define module-level values.

```donna
const answer = 42
```

Use `pub const` when another module should be able to use the value.

```donna
pub const version = "0.1.0"
```

Constants can include type annotations.

```donna
pub const pi: Float = 3.14
pub const default_port: Int = 1313
pub const site_name: String = "Donna"
```

Use constants for package metadata, defaults, and small values that should have one obvious home.

Use a function when the value needs arguments or real computation. Donna likes clarity. It is kind of her thing.

