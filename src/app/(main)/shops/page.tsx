import { PlusIcon } from "@radix-ui/react-icons";
import { getServerSession } from "@/lib/auth";
import { type Shop } from "@/types/base/shop";
import { getShops } from "@/actions/get-shops";
import { Button } from "@/components/ui/button";
import { SearchShopInput } from "@/components/search-shop-input";
import { ShopCard } from "@/components/shop-card";
import { ShopDialog } from "@/components/shop-dialog";

const searchShops = (shops: Shop[], tags: string[]) => {
  const lowercaseTags = tags.map((tag) => tag.toLowerCase());

  return shops.filter((shop) =>
    lowercaseTags.every(
      (tag) =>
        shop.name.toLowerCase().includes(tag) ||
        shop.address.toLowerCase().includes(tag) ||
        shop.province.toLowerCase().includes(tag) ||
        shop.postalcode.toLowerCase().includes(tag) ||
        shop.tel.toLowerCase().includes(tag)
    )
  );
};

type PageProps = {
  searchParams: {
    tag?: string | string[];
  };
};

export default async function Page({ searchParams: { tag } }: PageProps) {
  const session = await getServerSession();
  const { data: shops } = await getShops();
  const filteredShops = searchShops(
    shops ?? [],
    tag ? (Array.isArray(tag) ? tag : [tag]) : []
  );

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
        <div className="flex min-h-[2rem] items-center justify-between">
          <h2 className="text-2xl font-bold leading-none tracking-tight">
            {filteredShops?.length ?? "No"} massage shops found
          </h2>
          {session?.user.role === "admin" && (
            <ShopDialog>
              <Button variant="soft">
                <PlusIcon className="h-4 w-4" />
                Create shop
              </Button>
            </ShopDialog>
          )}
        </div>
        <div className="grid auto-cols-fr grid-cols-3 gap-8">
          {filteredShops.map((shop) => (
            <ShopCard key={shop._id} shop={shop} role={session?.user.role} />
          ))}
        </div>
      </section>
    </main>
  );
}
