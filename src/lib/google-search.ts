import { GoogleSearchResult } from "@/types/googleSearch";

export async function findReferencingTitles(targetUrl: string): Promise<{title: string, ogpImage?: string}[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  const cseId = process.env.GOOGLE_CSE_ID;
  
  if (!apiKey || !cseId) {
    throw new Error("Google API credentials are not configured");
  }

  // URLからパスの部分を抽出
  const urlPath = targetUrl.split('zenn.dev')[1];
  const query = `link:${targetUrl} OR "${urlPath}" site:zenn.dev`;
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cseId}`;


  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google API Error:", errorData);
      throw new Error(`Google Search API failed: ${response.status}`);
    }

    const data = await response.json();
    const items = data.items as GoogleSearchResult[];

    return items
      ?.filter((item) => item.link.includes("zenn.dev"))
      .map((item) => ({
        title: item.title,
        ogpImage: item.pagemap.cse_image[0]?.src,
      })) || [];
  } catch (error) {
    console.error("Error searching references:", error);
    return [];
  }
} 