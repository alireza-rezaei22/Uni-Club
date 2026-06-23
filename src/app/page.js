import Header from "@/Components/header/Header";
import LastOstads from "@/Components/lastOstads/LastOstads";
import { Suspense } from "react";
import Loading from "@/Components/loading/Loading";
import LastProducts from "@/Components/lastProducts/LastProducts";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col items-start md:mx-[5%]">
        <Header />
        <Suspense fallback={<Loading/>}>
          <LastOstads />
        </Suspense>
        <Suspense fallback={<Loading/>}>
          <LastProducts />
        </Suspense>
      </main>
    </>
  );
}
