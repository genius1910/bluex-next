import type { PageContent } from '@/cms/ecommerce';
import { AvailableLocaleType } from '@/cms/types';
import FrontMainSection from './main-section';
import FeatureSection from './feature-section';
import SlideSection from './slide-section';
import QuotationSection from './quotation-section';
import PricingSection from './pricing-section';

export default function Ecommerce(props: {
  content: PageContent;
  locale: AvailableLocaleType;
}) {
  const localizedContent = props.content[props.locale];

  return (
    <div>
      <FrontMainSection content={localizedContent} />
      <FeatureSection content={localizedContent} />
      <SlideSection content={localizedContent} />
      <QuotationSection content={localizedContent} />
      <PricingSection content={localizedContent} />
    </div>
  );
}
