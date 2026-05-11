#!/bin/sh
set -eu

repo="donna-lang/donna"
install_dir="${DONNA_INSTALL_DIR:-$HOME/.donna/bin}"
tmp_dir="${TMPDIR:-/tmp}/donna-install.$$"

say() {
  printf '%s\n' "$1"
}

need() {
  if ! command -v "$1" >/dev/null 2>&1; then
    say "error: required command not found: $1" >&2
    exit 1
  fi
}

cleanup() {
  rm -rf "$tmp_dir"
}

trap cleanup EXIT INT TERM

need uname
need mkdir
need tar
need grep
need sed
need tr
need head
need find
need cp
need chmod

if command -v curl >/dev/null 2>&1; then
  fetch="curl -fsSL"
elif command -v wget >/dev/null 2>&1; then
  fetch="wget -qO-"
else
  say "error: install needs curl or wget" >&2
  exit 1
fi

os="$(uname -s | tr '[:upper:]' '[:lower:]')"
arch="$(uname -m)"

case "$os" in
  linux) platform="linux" ;;
  darwin) platform="macos" ;;
  *) say "error: unsupported OS: $os" >&2; exit 1 ;;
esac

case "$arch" in
  x86_64|amd64) cpu="x86_64" ;;
  arm64|aarch64) cpu="aarch64" ;;
  *) say "error: unsupported architecture: $arch" >&2; exit 1 ;;
esac

api="https://api.github.com/repos/$repo/releases/latest"
say "Fetching latest Donna release..."

url="$($fetch "$api" \
  | grep browser_download_url \
  | grep "$platform" \
  | grep "$cpu" \
  | grep -E 'tar\.gz|tgz' \
  | head -n 1 \
  | sed 's/.*"browser_download_url": *"//; s/".*//')"

if [ -z "$url" ]; then
  say "error: no release artifact found for $platform/$cpu" >&2
  say "See: https://github.com/$repo/releases" >&2
  exit 1
fi

mkdir -p "$tmp_dir" "$install_dir"
say "Downloading $url"
$fetch "$url" > "$tmp_dir/donna.tar.gz"

tar -xzf "$tmp_dir/donna.tar.gz" -C "$tmp_dir"

bin="$(find "$tmp_dir" -type f -name donna -perm -111 | head -n 1)"
if [ -z "$bin" ]; then
  say "error: donna binary not found in archive" >&2
  exit 1
fi

cp "$bin" "$install_dir/donna"
chmod +x "$install_dir/donna"

say "Installed donna -> $install_dir/donna"
say ""
say "Add this to your shell profile if it is not already on PATH:"
say "  export PATH=\"$install_dir:\$PATH\""
say ""
say "Donna projects also need QBE and a C compiler available on PATH."
say "Try:"
say "  qbe --version"
say "  cc --version"
