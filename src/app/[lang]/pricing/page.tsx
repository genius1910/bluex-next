import Link from "next/link";

export default function Page() {
  return (
    <div className="relative w-full h-fit overflow-x-hidden">
      <div className="none lg:block">
        <div className="absolute w-full h-[31.875rem] bg-secondary"
        >
          <div className="absolute w-0 h-0 block border-l-[100vw] border-l-transparent border-b-[8rem] border-b-white border-solid left-0 bottom-0"></div>
        </div>
      </div>
      <h1>Hello, Pricing Page!</h1>
      <Link href="/pricing/detail">Pricing Detail</Link>
    </div>
  );
}
