# Web-skabelon

A complete marketing site template: docebo.com's structure and mechanics, rebuilt under the PREMIUM WEB BUILD playbook with our own look and Danish copy.

```bash
PORT=3400 npm run dev                         # http://localhost:3400
node scripts/shots.mjs / /priser              # self-review screenshots → .shots/ (375/768/1440)
```

**New project:** copy the folder, then change `src/content/site.ts`, `src/content/copy.da.ts`, `src/content/data.ts`, `--brand-h` in `globals.css` and the fonts in `layout.tsx`. Look at `/design-system`. Read PLAN.md, DECISIONS.md and PROGRESS.md.
