import PlayerPanel from "@/components/player/playerPanel";
import Box from "@/components/box/box";
import SearchWidget from "@/components/search/searchWidget";
import LibraryWidget from "@/components/lists/libraryWidget";
import { NavHomeButton } from "@/components/button/NavHomeButton";
import { NavPrevButton } from "@/components/button/NavPrevButton";
import { NavForwardButton } from "@/components/button/NavForwardButton";
import QueueTogglePanel from "@/components/queue/queueTogglePanel";

export default function DashboardLayout({children}) {
  return (
    <section className="pageWrapper -has-player grid grid-cols-7 gap-2 md:grid-rows-dashboard">
      <div className="pageWrapper__top grid grid-cols-7 gap-2 md:col-span-7">
          <div className="pageWrapper__nav">
            <div className="pageWrapper__nav-prev flex">
              <NavHomeButton />
            </div>
            <div className="pageWrapper__nav-prev flex">
              <NavPrevButton />
            </div>
            <div className="pageWrapper__nav-prev flex">
              <NavForwardButton />
            </div>
          </div>
          <div className="pageWrapper__search md:col-start-3 md:col-span-5">
            <div className="pageWrapper__search-wrapper">
              <SearchWidget />
            </div>
          </div>
      </div>
      <div className="pageWrapper__left md:col-span-2">
        <div className="pageWrapper__user-playlists h-full">
          <Box className="h-full">
            <LibraryWidget />
          </Box>
        </div>
      </div>
      <div className="pageWrapper__viewer relative z-1 md:col-start-3 md:col-span-5 overflow-hidden">
        <div className="pageWrapper__bar"></div>
        <div className="pageWrapper__content grid">
          <Box className="overflow-y-auto overflow-x-hidden">
            { children }
          </Box>
        </div>
        <QueueTogglePanel />
      </div>
      <div className="pageWrapper__player">
        <PlayerPanel />
      </div>
    </section>
  )
}