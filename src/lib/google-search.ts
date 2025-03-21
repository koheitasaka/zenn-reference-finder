export async function findReferencingTitles(targetUrl: string): Promise<string[]> {
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
    return data.items
      ?.filter((item: any) => item.link.includes("zenn.dev"))
      .map((item: any) => item.title) || [];
  } catch (error) {
    console.error("Error searching references:", error);
    return [];
  }
} 