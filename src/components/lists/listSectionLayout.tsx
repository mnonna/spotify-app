'use client';
import '@/scss/lists/listSection.scss';

interface ListSectionLayoutProps {
  children: any,
  heading?: string,
  classes?: string,
}

export default function ListSectionLayout({ children, heading, classes } : ListSectionLayoutProps) {
  return (
    <section className={`listSection ${classes}`}>
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