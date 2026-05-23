import Category from "@/Components/category/Category";
import Products from "@/Components/products/Products";
import Filter from "@/Components/filter/Filter";
import Header from "@/Components/header/Header";
import LastOstads from "@/Components/lastOstads/LastOstads";
import { Suspense } from "react";
import Loading from "@/Components/loading/Loading";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col items-start md:mx-[5%]">
        <Header />
        <Suspense fallback={<Loading/>}>
          <LastOstads />
        </Suspense>
        <Suspense fallback={<Loading/>}>
          <LastOstads />
        </Suspense>
      </main>
    </>
  );
}
