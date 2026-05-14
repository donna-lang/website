---
title = "Donna is here!"
slug = "posts/donna-is-here"
date = "2026-05-10"
layout = "post"
draft = false
tags = ["news", "release"]
lead = "The Donna website is live, and the first public release is here."
read_time = "2 min 45 sec read"
---

Donna is here. But first of all, what is Donna? Why is it called Donna? What's new?

## What is Donna

Let's break it down. Donna is a programming language. That's the short answer. Donna is a functional, statically typed, self-hosted programming language that compiles to native binaries using [QBE](https://c9x.me/compile/) as a compiler backend.
Donna's syntax is inspired mostly by [Gleam](https://gleam.run), with a few Python-like touches.

## What's new

What's new in Donna? The honest answer is that this is still early. But the foundation is here: a self-hosted compiler, native binaries through QBE, Git dependencies, a test runner, a docs generator, and a practical FFI story. At this stage, Donna is still a play project, but it is aiming to be simple in syntax, small, and focused on Developer Experience (DX).

## Where to use it

What can someone use Donna for? Donna has a few strong points. First, it compiles to native binaries, so you can create applications that are easy to distribute. Donna also has a clear FFI. You can take a whole C library, put it in the `ffi/` directory, add some external functions, and you are ready. The Donna compiler will handle the compilation and linking for you. With that in mind, you can build various types of projects, like:
- TUIs
- GUIs
- Games
- CLI apps
- Compilers (Donna compiler is written in Donna 😎)

## Why Donna?

Donna takes its name from the great character `Donna` from the SUITS TV series. Sharp, practical, and impossible to ignore. That felt like the right energy for a language that wants to stay small, clear, and useful.

## Release

Donna's initial release is live, and the [language tour](https://donna-lang.org/docs/) will help you understand Donna and start building your first project in a weekend. You can visit [GitHub](https://github.com/donna-lang/donna), star the project, and watch its evolution. This site will keep you updated on major releases. For minor releases, you can check the [changelog](https://github.com/donna-lang/donna/blob/main/CHANGELOG.md).

We hope you enjoy the Donna language and help us build this community from the ground up.
