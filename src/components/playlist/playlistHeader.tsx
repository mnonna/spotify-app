'use client';
import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/math";
import '@/scss/playlist/playlistHeader.scss';
import { closeQueue } from "@/utils/redux/queue";
import AppButton from "../button/AppButton";
import { useDispatch } from "react-redux";

interface PlaylistHeaderProps {
  name: string;
  description?: string;
  image?: string;
  type?: string;
  owner?: string;
  followersCount?: number;
  full?: boolean;
  headerClass?: string;
  headerType?: string;
}

export default function PlaylistHeader({
  name = "",
  description = "",
  image = "",
  type = "",
  owner = "",
  followersCount = 0,
  full = false,
  headerClass = "text-7xl",
  headerType = "playlist"
}: Partial<PlaylistHeaderProps>) {
  const dispatch = useDispatch();
  const followers = formatNumberWithSpaces(followersCount);
  const classes = full ? '-full' : '';

  let imageWidth = 300;
  let imageHeight = 300;

  if (full) {
    imageWidth = 640;
    imageHeight = 640;
  }

  return (
    <section className={`playlistHeader flex gap-6 items-end mb-4 last:mb-0 ${classes}`}>
      {image &&
        <div className="playlistHeader__image">
          <Image
            src={image}
            width={imageWidth}
            height={imageHeight}
            alt={`Playlist image: ${name}`}
            priority={true}
          />
        </div>}
      <div className="w-full playlistHeader__content">
        <p className="playlistHeader__type text-sm font-medium">{type}</p>
        <div className="w-full flex justify-between items-center gap-2">
          <p className={`playlistHeader__title mb-4 last:mb-0 ${headerClass} font-bold`}>{name}</p>
          {headerType === "queue" && <AppButton
            classNames="-with-icon -round"
              muiIcon="CloseIcon"
              onClick={() => dispatch(closeQueue())}
            />
          }
        </div>
        <p className="text-sm font-medium">{description}</p>
        {(owner || followers) &&
          <div className="playlistHeader__details">
            {owner &&
              <div className="playlistHeader__detail">
                <p className="text-sm font-bold">{owner}</p>
              </div>
            }
            {followers &&
              <div className="playlistHeader__detail">
                <div>&bull;</div><p className="text-sm font-medium">saved {followers} times</p>
              </div>
            }
          </div>
        }
      </div>
    </section>
  )
}