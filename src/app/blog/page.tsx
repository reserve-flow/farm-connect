import BlogLayout from "@/pages/BlogLayout";
import { getAllPosts } from "@/services/api/blog";

export default async function Page() {
    const posts = await getAllPosts();
    return <BlogLayout initialPosts={posts} />;
}
