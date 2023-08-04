import BlogList from '@/components/blog/blog-list';

export default async function Page({ params }: { params: { lang: string } }) {
  return (
    <BlogList
      lang={params.lang}
      page={'1'}
    />
  )
}
