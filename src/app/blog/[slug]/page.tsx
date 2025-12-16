import { Metadata } from "next";
import BlogPost from "@/pages/BlogPost";
import { getPostBySlug } from "@/services/api/blog"; // adjust to your fetcher


type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return { title: "Post not found" };

    const canonical = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;

    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords?.split(",").map(k => k.trim()),
        authors: [{ name: post.author }],
        alternates: { canonical },
        openGraph: {
            type: "article",
            url: canonical,
            title: post.title,
            description: post.description,
            images: [{ url: post.image }],
            publishedTime: post.date,
            tags: post.keywords,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [post.image],
        },
    };
}

export default async function Page({ params }: Params) {
    const { slug } = await params;
    return <BlogPost slug={slug} />;
}
