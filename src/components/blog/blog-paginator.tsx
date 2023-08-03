import Button from "@/components/common/ripple-button";

export default function BlogPaginator({ page, pageCount }: { page: number, pageCount: number }) {
  return (
    <div
      className="relative flex flex-col lg:flex-row w-full items-center justify-center"
    >
      <div
        className="flex items-center justify-center"
      >
        {page > 0 && (
          <Button
            className="text-secondary mr-2.5 px-2 py-1.5 border-2 border-solid border-secondary w-36 text-sm font-button capitalize leading-6 hover:bg-secondary hover:text-white transition-colors duration-300"
            // onClick={() => SwitchPage(page - 1)}
          >
            Previous
          </Button>
        )}
        {page < pageCount && (
          <Button
            className="text-white mr-2.5 px-2 py-1.5 bg-secondary border-2 border-solid border-secondary w-36 text-sm font-button capitalize leading-6 hover:bg-white hover:text-secondary transition-colors duration-300"
            // onClick={() => SwitchPage(page - 1)}
          >
            Next
          </Button>
        )}
      </div>

    </div>
  )
}
