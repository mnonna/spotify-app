import PlayerPanel from "@/components/player/playerPanel"

export default function DashboardLayout({children}) {
  return (
    <section className="pageWrapper -has-player grid grid-cols-7 gap-2">
      <div className="pageWrapper__left md:col-span-2">
        <div className="pageWrapper__nav">
          
        </div>
      </div>
      <div className="pageWrapper__viewer md:col-start-3 md:col-span-5 overflow-hidden">
        <div className="pageWrapper__bar"></div>
        <div className="pageWrapper__content grid">
          { children }
        </div>
      </div>
      <div className="pageWrapper__player">
        <PlayerPanel />
      </div>
    </section>
  )
}