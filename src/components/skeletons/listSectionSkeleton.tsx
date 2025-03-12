import CardSkeleton from "./cardSkeleton";
import '@/scss/skeletons/listSectionSkeleton.scss';

interface ListSectionSkeletonProps {
    heading?: string,
    itemsCount: number
}

export default function ListSectionSkeleton(props: ListSectionSkeletonProps) {
    const { heading, itemsCount} = props;

    return (
        <div className="listSectionSkeleton">
            {heading ? <h2 className="listSectionSkeleton__heading">{heading}</h2> : null}
            <div className="listSectionSkeleton__wrapper">
                {Array.from({ length: 10 }).map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </div>
        </div>
    )
}