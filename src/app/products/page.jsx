import Category from "@/Components/category/Category";
import Products from "@/Components/products/Products";
import Filter from "@/Components/filter/Filter";

export default async function ProductsPage() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, { next: { revalidate: 300 } })

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
