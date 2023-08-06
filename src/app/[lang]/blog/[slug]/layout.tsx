import { fetchSlugs } from "@/cms/blog-search";

export async function generateStaticParams() {
  const slugs = await fetchSlugs();
  return slugs.map((slug) => ({
    slug: slug.Url,
  }));
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
