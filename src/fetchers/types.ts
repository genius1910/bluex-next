//
// lang type defines the page path of each language
// locale type defines the language of the content in the CMS
//

const AvailableLangs = ['en', 'zh-TW', 'zh-CN'] as const;
const AvailableLocales = ['en', 'zh-Hant-TW', 'zh-Hans-CN'] as const;

type AvailableLangType = typeof AvailableLangs[number];
type AvailableLocaleType = typeof AvailableLocales[number];

const pathLangToCmsLangMap = {
  en: 'en',
  'zh-TW': 'zh-Hant-TW',
  'zh-CN': 'zh-Hans-CN',
}

export { AvailableLangs, AvailableLocales }
export type { AvailableLocaleType, AvailableLangType }

export function mapLangToLocale(pathLang: AvailableLangType): AvailableLocaleType {
  return pathLangToCmsLangMap[pathLang] as AvailableLocaleType;
}
