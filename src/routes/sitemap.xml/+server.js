const PUBLIC_CANONICAL_ORIGIN = "https://reflectionsprojections.org"

/**
 * @param {string | URL} path
 * @param {string} lastmod
 */
function create_entry(path, lastmod) {
    return `<url>
    <loc>${new URL(path, PUBLIC_CANONICAL_ORIGIN).href}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
  </url>`;
}

export async function GET() {

    const routes = [
        '/',
        '/speakers',
        '/register',
        '/login',
        '/mechmania',
        '/puzzlebang'
    ]

    return new Response(
        `
      <?xml version="1.0" encoding="UTF-8" ?>
      <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
      >
        ${routes.map(route => create_entry(route, '2023-08-30')).join('\n')
            }
      </urlset>`.trim(),
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
    );
}