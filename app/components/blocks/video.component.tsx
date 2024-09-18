import {
  PageBlocksGridGrid_ColumnsBlocksVideo,
  PageBlocksVideo
} from '@/tina/__generated__/types';

export default function VideoBlock({
  data
}: {
  data: PageBlocksVideo | PageBlocksGridGrid_ColumnsBlocksVideo;
}) {
  return (
    <video
      width={data.width ?? undefined}
      height={data.height ?? undefined}
      controls={data.controls ?? false}
      autoPlay={data.autoplay ?? false}
      loop={data.loop ?? false}
      muted={data.muted ?? false}
      preload='none'
    >
      <source src={data.video_ref} />
      Your browser does not support the video tag.
    </video>
  );
}
