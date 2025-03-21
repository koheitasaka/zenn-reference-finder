export interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  username: string;
  path: string;
  published_at: string;
}

export interface ZennSearchResponse {
  articles?: ZennArticle[];
  scraps?: ZennArticle[];
  next_page: number | null;
}

export interface ReferenceArticle {
  title: string;
  url: string;
  ogpImage?: string;
} 