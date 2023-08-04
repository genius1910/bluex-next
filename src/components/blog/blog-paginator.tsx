import { AvailableLocaleType } from "@/cms/types";
import Button from "@/components/common/ripple-button";
import Link from "next/link";

export default function BlogPaginator({ locale, page, pageCount }: { locale: AvailableLocaleType, page: number, pageCount: number }) {
  return (
    <div
      className="relative flex flex-col lg:flex-row w-full items-center justify-center"
    >
      <div
        className="flex items-center justify-center"
      >
        {page > 1 && (
          <Link
            href={`/${locale}/blog/page/${page - 1}`}
          >
            <Button
              className="text-secondary mr-2.5 px-2 py-1.5 border-2 border-solid border-secondary w-36 text-sm font-button capitalize leading-6 hover:bg-secondary hover:text-white transition-colors duration-300"
            >
              Previous
            </Button>
          </Link>
        )}
        {page < pageCount && (
          <Link
            href={`/${locale}/blog/page/${page + 1}`}
          >
            <Button
              className="text-white mr-2.5 px-2 py-1.5 bg-secondary border-2 border-solid border-secondary w-36 text-sm font-button capitalize leading-6 hover:bg-white hover:text-secondary transition-colors duration-300"
            >
              Next
            </Button>
          </Link>
        )}
      </div>

    </div>
  )
}
