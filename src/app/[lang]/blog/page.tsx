import BlogPage from '@/components/blog/blog-page';

export default async function Page({ params }: { params: { lang: string } }) {
  return (
    <BlogPage
      lang={params.lang}
      page={'1'}
    />
  )
}
