'use client';

import CardSkeleton from "./cardSkeleton";
import '@/scss/lists/listSection.scss';
import '@/scss/cards/cardSkeleton.scss';
import '@/scss/skeletons/listSectionSkeleton.scss';

interface ListSectionSkeletonProps {
    heading?: string,
    itemsCount: number
}

export default function ListSectionSkeleton(props: ListSectionSkeletonProps) {
    const { heading, itemsCount} = props;

    return (
        <div className="listSection listSectionSkeleton">
            {heading ? <h2 className="listSectionSkeleton__heading">{heading}</h2> : null}
            <div className="listSectionSkeleton__wrapper">
                {Array.from({ length: itemsCount }).map((_, index) => (
                    <div className="listSectionSkeleton__item" key={index}>
                        <CardSkeleton />
                    </div>
                ))}
            </div>
        </div>
    )
}