import Category from "@/Components/category/Category";
import Products from "@/Components/products/Products";
import Filter from "@/Components/filter/Filter";
import { SearchX } from "lucide-react";
import PopUp from "@/Components/popUp/PopUp";

export default async function ProductsPage() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pیroducts`, { next: { revalidate: 300 } })

  if (!res.ok) {
    return (
      <PopUp Icon={SearchX} msg={'اتصال برقرار نشد'} />
    );
  }

  const productsList = await res.json()
  return (
    <>
      <main className="flex flex-col items-start md:flex-row md:mx-[5%] p-5">
        <aside className="md:w-1/5 md:h-fit md:flex-col md:items-start md:m-2  md:space-y-2">
          <Category />
          <Filter />
        </aside>
        <Products productsList={productsList} />
      </main>
    </>
  );
}
