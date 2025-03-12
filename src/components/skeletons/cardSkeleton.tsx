'use client';
export default function CardSkeleton () {
    return (
        <div className="cardSkeleton flex flex-col w-full">
            <div className="cardSkeleton__image rounded-lg mb-4"></div>
            <div className="cardSkeleton__title">
                <div className="cardSkeleton__title-bar rounded-lg mb-2 h-3"></div>
                <div className="cardSkeleton__title-bar rounded-lg h-3"></div>
            </div>
        </div>
    )
}