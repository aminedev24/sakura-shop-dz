#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Expand minified CSS for editing, without disturbing comment placement.

A comment that sat on the same source line as the declaration before it stays
there as a trailing comment; a comment on its own line stays on its own line.
Getting that wrong silently destroys custom properties, because a declaration
that loses its semicolon swallows the next one into its value.

    python3 scripts/format-css.py FILE [FILE...]
"""
import io, os, re, sys


def split_top(s, sep):
    out, depth, quote, cur = [], 0, None, []
    for ch in s:
        if quote:
            cur.append(ch)
            if ch == quote: quote = None
            continue
        if ch in '"\'':
            quote = ch; cur.append(ch); continue
        if ch in '([': depth += 1
        elif ch in ')]': depth -= 1
        if ch == sep and depth == 0:
            out.append(''.join(cur)); cur = []
        else:
            cur.append(ch)
        continue
    if ''.join(cur).strip():
        out.append(''.join(cur))
    return out


def declarations(body, indent):
    """Emit one declaration per line, keeping comments where they belong."""
    lines, pending = [], []
    for chunk in split_top(body, ';'):
        if not chunk.strip():
            continue
        # comments at the head of a chunk belong to whatever came before if they
        # were on that same source line, otherwise they introduce what follows
        while True:
            m = re.match(r'\s*(/\*.*?\*/)', chunk, re.S)
            if not m: break
            before = chunk[:m.start(1)]
            comment = m.group(1)
            chunk = chunk[m.end(1):]
            if lines and '\n' not in before:
                lines[-1] += '  ' + comment          # trailing comment
            else:
                pending.append(indent + comment)      # own line
        if not chunk.strip():
            continue
        lines.extend(pending); pending = []
        i = chunk.find(':')
        if i < 0:
            lines.append(indent + chunk.strip() + ';')
        else:
            prop, val = chunk[:i].strip(), chunk[i+1:].strip()
            lines.append('%s%s: %s;' % (indent, prop, val))
    lines.extend(pending)
    return lines


def selector(sel):
    parts = [p.strip() for p in split_top(re.sub(r'\s+', ' ', sel.strip()), ',')]
    joined = ', '.join(parts)
    return ',\n'.join(parts) if len(joined) > 70 and len(parts) > 1 else joined


def blocks(text, indent):
    res, k = [], 0
    while k < len(text):
        if text[k] in ' \n\t;':
            k += 1; continue
        if text.startswith('/*', k):
            end = text.index('*/', k) + 2
            res.append(indent + ' '.join(text[k:end].split('\n   ')).strip()
                       if False else indent + text[k:end])
            k = end; continue
        if text.startswith('@', k) and '{' in text[k:]:
            head_end = text.index('{', k)
            head = re.sub(r'\s+', ' ', text[k:head_end].strip())
            depth, j = 0, head_end
            while True:
                if text[j] == '{': depth += 1
                elif text[j] == '}':
                    depth -= 1
                    if depth == 0: break
                j += 1
            inner = text[head_end+1:j]
            res.append('%s%s {' % (indent, head))
            res += (blocks(inner, indent + '  ') if '{' in inner
                    else declarations(inner, indent + '  '))
            res.append(indent + '}')
            res.append('')
            k = j + 1; continue
        sel_end = text.index('{', k)
        depth, j = 0, sel_end
        while True:
            if text[j] == '{': depth += 1
            elif text[j] == '}':
                depth -= 1
                if depth == 0: break
            j += 1
        res.append('%s%s {' % (indent, selector(text[k:sel_end])))
        res += declarations(text[sel_end+1:j], indent + '  ')
        res.append(indent + '}')
        res.append('')
        k = j + 1
    return res


def format_css(css):
    return re.sub(r'\n{3,}', '\n\n', '\n'.join(blocks(css, ''))).strip() + '\n'


if __name__ == '__main__':
    for path in sys.argv[1:]:
        src = io.open(path, encoding='utf-8').read()
        out = format_css(src)
        io.open(path, 'w', encoding='utf-8').write(out)
        print('%-32s %4d -> %4d lines' % (os.path.basename(path),
              src.count('\n') + 1, out.count('\n') + 1))
