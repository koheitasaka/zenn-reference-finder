export interface GoogleSearchResult {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap: Pagemap;
}

type Pagemap = {
  cse_thumbnail: [
    {
      src: string;
      width: string;
      height: string;
    }
  ],
  metatags: [
    {
      'og:image': string;
      'next-head-count': string;
      'twitter:card': string;
      'og:type': string;
      'og:site_name': string;
      viewport: string;
      'og:title': string;
      'apple-mobile-web-app-title': string;
      'og:url': string;
      'zenn:image': string;
      'zenn:description': string;
    }
  ],
  cse_image: [
    {
      src: string; // OGP画像のURL
    }
  ]
}