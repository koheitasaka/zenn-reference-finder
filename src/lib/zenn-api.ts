import { ZennArticle, ZennSearchResponse } from "../types/zenn";

export async function searchZennArticle(title: string): Promise<ZennArticle | null> {
  const query = encodeURIComponent(title);
  
  // まずarticlesで検索
  let url = `https://zenn.dev/api/search?q=${query}&order=daily&source=articles&page=1`;
  let response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Zenn API failed: ${response.status}`);

  let data: ZennSearchResponse = await response.json();
  let article = data.articles?.find((a) => a.title === title);
  if (article) {
    console.log("Found in articles:", article);
    return article;
  }

  // articlesで見つからなかった場合、scrapsで検索
  url = `https://zenn.dev/api/search?q=${query}&order=daily&source=scraps&page=1`;
  response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Zenn API failed: ${response.status}`);

  data = await response.json();
  article = data.scraps?.find((a) => a.title === title);
  if (article) {
    console.log("Found in scraps:", article);
    return article;
  }

  console.log("No match found for title:", title);
  return null;
}