import OstadsFilter from "@/Components/ostadsFilter/OstadsFilter";
import OstadsList from "@/Components/ostadsList/OstadsList";

export default async function ostads() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ostads`, { next: { revalidate: 300 } })

  const productsList = await res.json()
  console.log(productsList);
  
  return (
    <>
      <main className="flex flex-col items-start md:flex-row md:mx-[5%] p-5">
        <aside className="md:w-1/5 md:h-fit md:flex-col md:items-start md:m-2  md:space-y-2">
          {/* <Category /> */}
          <OstadsFilter />
        </aside>
              <OstadsList ostadsArray={productsList} />
      </main>
    </>
  );
}
