export default function ListSectionLayout({ children, heading }) {
  return (
    <section className="listSection">
      {(heading && heading !== '') &&
        <div className="listSection__heading">
          <h3 className="text-xl mb-5 md:text-2xl font-bold">
            { heading }
          </h3>
        </div>
      }
      <div className="listSection__wrapper">
        { children }
      </div>
    </section>
  )
}