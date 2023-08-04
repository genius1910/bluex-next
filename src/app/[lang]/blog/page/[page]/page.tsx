import BlogList from '@/components/blog/blog-list';

export default async function Page({ params }: { params: { lang: string, page: string } }) {
  return (
    <BlogList
      lang={params.lang}
      page={params.page}
    />
  )
}
