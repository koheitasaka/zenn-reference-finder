"use client";

import { useState } from "react";
import { Search, ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReferenceArticle {
  title: string;
  url: string;
}

export default function ZennReferenceFinder() {
  const [inputUrl, setInputUrl] = useState("");
  const [articles, setArticles] = useState<ReferenceArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl }),
      });

      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setArticles(data.articles);
    } catch (err: any) {
      setError(err.message || "エラーが発生しました。もう一度試してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-orange-50 px-4 py-16">
      <div className="w-full max-w-md md:max-w-xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-[#FFAF59]" />
            <h1 className="text-3xl font-bold tracking-tight">Zenn Reference Finder</h1>
          </div>
          <p className="text-muted-foreground">Zenn記事の参照元を簡単に検索</p>
        </div>

        <Card className="border-[#FFAF59]/20 shadow-lg">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Zenn記事のURLを入力 (例: https://zenn.dev/...)"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="pr-10 border-[#FFAF59]/30 focus-visible:ring-[#FFAF59] h-16 text-lg"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !inputUrl}
                className="w-full bg-[#FFAF59] hover:bg-[#FF9F40] text-white py-2"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>検索中...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-bold text-lg">
                    <Search className="h-4 w-4" />
                    <span>検索</span>
                  </div>
                )}
              </Button>
            </form>

            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

            {hasSearched && !loading && !error && (
              <div className="mt-6">
                {articles.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#FFAF59]">{articles.length}件</Badge>
                      <h2 className="font-medium">以下の記事で参照されています！</h2>
                    </div>
                    <div className="space-y-3">
                      {articles.map((article, index) => (
                        <a
                          key={index}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start p-3 rounded-lg border border-[#FFAF59]/20 hover:bg-orange-50 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-medium text-[#FFAF59] hover:text-[#FF9F40] transition-colors">
                              {article.title}
                            </h3>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#FFAF59] mt-1 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-3">
                      <Search className="h-6 w-6 text-[#FFAF59]" />
                    </div>
                    <h2 className="text-lg font-medium mb-1">参照元記事が見つかりませんでした</h2>
                    <p className="text-sm text-muted-foreground">別のZenn記事URLを試してみてください</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>© 2025 Zenn Reference Finder</p>
        </div>
      </div>
    </div>
  );
}
