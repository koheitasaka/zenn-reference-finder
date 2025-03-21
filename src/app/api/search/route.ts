import { NextResponse } from "next/server";
import { findReferencingTitles } from "../../../lib/google-search";
import { searchZennArticle } from "../../../lib/zenn-api";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || !url.startsWith("https://zenn.dev")) {
      return NextResponse.json(
        { error: "有効なZenn URLを入力してください" },
        { status: 400 }
      );
    }

    // Web検索で参照元タイトルを取得
    const titleAndOgpImageList = await findReferencingTitles(url);

    // Zenn APIで正確な記事データを取得
    const articles = (
      await Promise.all(
        titleAndOgpImageList.map(async (titleAndOgpImage) => {
          const article = await searchZennArticle(titleAndOgpImage.title);
          return article
            ? {
                title: titleAndOgpImage.title,
                url: `https://zenn.dev${article.path}`,
                ogpImage: titleAndOgpImage.ogpImage,
              }
            : null;
        })
      )
    ).filter((a): a is NonNullable<typeof a> => a !== null);

    return NextResponse.json({ articles });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "参照元の検索に失敗しました" },
      { status: 500 }
    );
  }
} 