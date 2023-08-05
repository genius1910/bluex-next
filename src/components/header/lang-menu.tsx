"use client";

import { Locale } from "@/cms/langs";
import { AvailableLocaleType, mapLocaleToLang } from "@/cms/types";
import { usePathname } from "next/navigation";
import { MainMenu } from "./header-menu";

export default function LangMenu({
  locale,
  allLocales,
  background
}: {
  allLocales: Locale[];
  locale: AvailableLocaleType;
  background?: 'white' | 'dark';
}) {
  const pathname = usePathname();
  const root = pathname === "/";
  return (
    <MainMenu // language menu
      title={allLocales.find((loc) => loc.code === locale)?.name ?? "-"}
      background={background}
      options={allLocales.map((loc) => ({
        label: loc.name,
        url: root
          ? `/${mapLocaleToLang(loc.code)}`
          : pathname.replace(
              `/${mapLocaleToLang(locale)}`,
              `/${mapLocaleToLang(loc.code)}`,
            ),
      }))}
    />
  );
}
