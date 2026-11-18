// Sikkerhed: skjulte projektfiler må aldrig kunne hentes fra hjemmesiden, uanset hvor den hostes.
// Det gælder især git-mappen (.git), der indeholder hele kildekoden og dens historik, og miljøfiler (.env)
// med nøgler. Vercel udgiver dem ikke i dag, men reglen sikrer det også, hvis siden flyttes, eller hvis
// en fil ved et uheld havner i public/. Svarer altid 404, som om filen ikke findes.
// .well-known (bruges til bl.a. domænebekræftelse) er bevidst ikke med.

const HIDDEN = /(^|\/)\.(git|svn|hg|env|vercel|npmrc|DS_Store)(\/|$|\.|-)/i;

export function proxy(request: Request) {
  const { pathname } = new URL(request.url);
  let path = pathname;
  try {
    path = decodeURIComponent(pathname); // fanger også %2Egit
  } catch {}
  if (HIDDEN.test(path) || HIDDEN.test(pathname)) {
    return new Response("Not found", { status: 404, headers: { "cache-control": "no-store" } });
  }
}

// Kører kun på stier, hvor et led starter med et af de skjulte navne, så resten af siden ikke påvirkes
export const config = {
  matcher: ["/((?:.*/)?\\.(?:git|svn|hg|env|vercel|npmrc|DS_Store).*)"],
};
