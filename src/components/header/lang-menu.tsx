"use client";

import { usePathname } from "next/navigation";
import { MainMenu } from "./header-menu";
import { Locale } from "@/cms/langs";
import { AvailableLocaleType, mapLocaleToLang } from "@/cms/types";

export default function LangMenu({ locale, allLocales }: { allLocales: Locale[], locale: AvailableLocaleType }) {
  const pathname = usePathname()
  return (
    <MainMenu // language menu
      title={allLocales.find(loc => loc.code === locale)?.name ?? '-'}
      options={allLocales.map(loc => ({
        label: loc.name,
        url: pathname.replace(`/${mapLocaleToLang(locale)}`, `/${mapLocaleToLang(loc.code)}`),
      }))}
    />
  )
}
