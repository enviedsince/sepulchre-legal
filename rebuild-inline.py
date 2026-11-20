#!/usr/bin/env python3
"""Update inlined CSS and JS from assets/ after making changes.

Runs offline, touches only the seven existing HTML pages in this folder.
No dependency beyond Python 3.8+, no git or network actions.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / 'assets' / 'style.css').read_text(encoding='utf-8')
JS = (ROOT / 'assets' / 'site.js').read_text(encoding='utf-8')
PAGES = ['index','features','commands','purchase','faq','embeds','status']
for name in PAGES:
    p = ROOT / f'{name}.html'
    data = p.read_text(encoding='utf-8')
    new, a = re.subn(r'(?s)(<style>).*?(</style>)', lambda m: m.group(1) + CSS + m.group(2), data, count=1)
    new, b = re.subn(r'(?s)(<script>).*?(</script>)', lambda m: m.group(1) + JS + m.group(2), new, count=1)
    if (a, b) != (1, 1):
        raise SystemExit(f'ERROR: {name}.html is missing the expected inline style/script tags')
    p.write_text(new, encoding='utf-8')
    print(f'Updated {name}.html')
print('Finished. Review changes before publishing.')
