import { Suspense } from "react";
import ListSection from "@/components/lists/listSection"
import Box from "@/components/box/box";

export default function Dashboard() {
  return (
    <>
      <Box className="overflow-y-auto overflow-x-hidden">
        <section className="grid gap-y-12 md:gap-y-20 w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <ListSection listType={'following'}></ListSection>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <ListSection listType={'featured-playlists'}></ListSection>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <ListSection listType={'browse-categories'}></ListSection>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <ListSection listType={'saved-tracks'}></ListSection>
          </Suspense>
        </section>
      </Box>
    </>
  )
}