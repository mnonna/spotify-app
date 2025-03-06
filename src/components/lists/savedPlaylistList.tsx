'use client';
import { FC } from "react";
import CardSong from "../cards/cardSong";
import ListSectionLayout from "@/components/lists/listSectionLayout";

interface savedPlaylistsListProps {
    data: any,
    heading?: string
}

const SavedPlaylistsList: FC<savedPlaylistsListProps> = ({
    data, heading
}) => {
    return (
        <ListSectionLayout heading={heading ?? ''} classes="-list h-full">
            {data.items.map((item, index) => {
                const cardImage = (item.images) ? item.images[0].url : '';
                const { owner } = item;

                if (owner) owner.name = owner.display_name;

                return (
                    <div className="listSection__item" key={index}>
                        <CardSong image={cardImage} name={item.name} artists={[owner]} uri={item.uri} />
                    </div>
                )
            })}
        </ListSectionLayout>
    )
}

export default SavedPlaylistsList;