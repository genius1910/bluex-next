import Ecommerce from '@/components/ecommerce-page/ecommerce';
import { fetchContent } from '@/cms/ecommerce';
import { AvailableLangType, mapLangToLocale } from '@/cms/types';

export default async function Page({ params }: { params: { lang: string } }) {
  const content = await fetchContent();
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  if (!locale) {
    return false;
  }

  return <Ecommerce content={content} locale={locale} />;
}
