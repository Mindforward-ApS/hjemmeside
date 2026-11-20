# Indhold

`blog/` indeholder blogindlæggene: ét indlæg = én fil, `content/blog/<slug>.md`.
Billeder ligger i `public/blog/<slug>/`. Regler, felter og fremgangsmåde står
i [`seo/blog-cloud-runbook.md`](../seo/blog-cloud-runbook.md).

Tjek altid, før du pusher:

    node scripts/blog-check.mjs
