import { ZennArticle, ZennSearchResponse } from "../types/zenn";

export async function searchZennArticle(title: string): Promise<ZennArticle | null> {
  const query = encodeURIComponent(title);
  const url = `https://zenn.dev/api/search?q=${query}&order=daily&source=articles&page=1`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Zenn API failed: ${response.status}`);

    const data: ZennSearchResponse = await response.json();
    return data.articles.find((a) => a.title === title) || null;
  } catch (error) {
    console.error("Error searching Zenn article:", error);
    return null;
  }
} 