---
title = "Installation"
slug = "docs/installation"
date = "2026-05-12"
layout = "doc"
draft = false
tags = ["docs", "install"]
weight = 2
lead = "Install Donna and the native tools it needs to build real binaries."
category = "Getting Started"
---

# Installation

Donna builds native executables. That means even if you download a prebuilt Donna binary, your projects still need a few native tools.

You need:

- QBE
- A C compiler, such as `cc`, `clang`, `gcc`, or `zig cc`
- Git, when your project uses Git dependencies

The website installer will use the latest release:

```sh
curl -sSf https://donna-lang.org/install.sh | sh
```

Check that Donna is available:

```sh
donna --version
donna help
```

Donna projects usually live in a directory with a `donna.toml` file and a `src/` folder. Create one and run the generated test suite:

```sh
donna new hello
cd hello
donna test
```

If QBE or a C compiler is missing, Donna should tell you before the build falls into backend noise. That is the standard we want: useful errors, not a mystery trial. Donna Paulsen would not accept a linker stack trace as a personality.

On Windows, the easiest path is usually `zig cc`. If that is not available, use another C compiler or WSL.

## Dependencies

Packages are added in `donna.toml`.

```toml
[dependencies]
donna = { git = "https://github.com/donna-lang/donna_stdlib", version = ">=0.1.0 and <1.0.0" }
```

Use `version` for normal packages. Donna will look at Git tags and choose a tag that satisfies the constraint.

For exact builds, pin a Git revision:

```toml
[dependencies]
donna = { git = "https://github.com/donna-lang/donna_stdlib", rev = "fbaac2a" }
```

You can also target a tag or branch when that is what you mean:

```toml
[dependencies]
donna = { git = "https://github.com/donna-lang/donna_stdlib", tag = "v0.1.1" }
markdown = { git = "https://github.com/NikolasSkyl/markdown", branch = "main" }
```

Donna writes resolved Git revisions into `donna.lock`. Commit the lockfile for applications. For libraries, commit it when you want contributors and CI to use the same package revisions.

Refresh locked dependencies intentionally:

```sh
donna clean --lock
donna build
```
