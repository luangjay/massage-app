import { SearchShopInput } from "@/components/search-shop-input";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="bg-accent-3 py-20">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-7">
          <h1 className="text-2xl font-medium tracking-tight">
            Search Massage Shops
          </h1>
          <div className="flex w-full flex-col items-center gap-4">
            <SearchShopInput />
            <p className="text-gray-a11">
              Tip: Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-8 pt-16">
        <h2 className="text-2xl font-bold leading-none tracking-tight">
          3 massage shops found
        </h2>
      </section>
    </main>
  );
}
