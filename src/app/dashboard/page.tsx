import { Suspense } from "react";
import ListSection from "@/components/lists/listSection"
import ListSectionSkeleton from "@/components/skeletons/listSectionSkeleton";

export default function Dashboard() {
  return (
    <>
      <section>
        <Suspense fallback={<ListSectionSkeleton itemsCount={6}/>}>
          <ListSection listType={'artists'}></ListSection>
        </Suspense>
        <Suspense fallback={<ListSectionSkeleton itemsCount={6}/>}>
          <ListSection listType={'following'}></ListSection>
        </Suspense>
        <Suspense fallback={<ListSectionSkeleton itemsCount={6}/>}>
          <ListSection listType={'featured-playlists'}></ListSection>
        </Suspense>
        <Suspense fallback={<ListSectionSkeleton itemsCount={6}/>}>
          <ListSection listType={'browse-categories'}></ListSection>
        </Suspense>
        <Suspense fallback={<ListSectionSkeleton itemsCount={6}/>}>
          <ListSection listType={'saved-tracks'}></ListSection>
        </Suspense>
      </section>
    </>
  )
}