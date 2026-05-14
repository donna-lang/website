---
title = "Donna now has a Tree-sitter grammar"
slug = "posts/donna-treesitter"
date = "2026-05-14"
layout = "post"
draft = false
tags = ["tooling", "editor"]
lead = "Tree-sitter support is here, bringing accurate syntax highlighting to editors that support it."
read_time = "3 min 15 sec read"
---

![Donna syntax tree](https://raw.githubusercontent.com/donna-lang/tree-sitter-donna/main/assets/donna-tree.png)

Donna now has a [tree-sitter](https://tree-sitter.github.io/tree-sitter/) grammar. That means better editor support, smarter highlighting, and a foundation for building real tooling around the language.

## What's a tree-sitter parser?

Tree-sitter is a parser generator tool and an incremental parsing library. It builds a concrete syntax tree for a source file and efficiently updates that tree as the file is edited. The key word is incremental — it does not re-parse the whole file on every keystroke. It only re-parses what changed. That makes it fast enough to run in real time inside an editor.

Most language support in editors today is built on regular expressions. Regex-based grammars are fast to write but they break easily. Strings that look like keywords get colored as keywords. Comments inside strings get parsed as code. Tree-sitter does not have these problems because it actually understands the structure of the code.

## What this means for Donna

Before this, editors had no understanding of Donna files. You could write a `.donna` file and at best get generic text coloring. Now, editors that support tree-sitter — Zed, Neovim, Helix, Emacs, and others — can properly highlight Donna code. Functions are colored as functions. Types as types. Module paths as namespaces. Pattern variables as parameters. The editor sees the same structure the compiler sees.

## Editor support

The Zed extension for Donna already uses this grammar and is available at [zed-donna](https://github.com/donna-lang/zed-donna). A Visual Studio Code extension is also available at [vscode-donna](https://github.com/donna-lang/vscode-donna), using the grammar compiled to WebAssembly to power semantic token highlighting directly inside VS Code.

We intent to add more editor support as Donna grows. 

## What's next

The grammar covers the full Donna syntax as it stands today. As the language evolves, the grammar will follow. The [tree-sitter-donna](https://github.com/donna-lang/tree-sitter-donna) repository is open and contributions are welcome.

If you build something on top of it — a plugin, a highlight theme, a query file — let us know on [GitHub](https://github.com/donna-lang/donna).
