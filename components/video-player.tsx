import { cn } from "@/lib/utils";

export default function VideoPlayer({ ...props }) {
  return (
    <video
      {...props}
      muted
      autoPlay
      loop
      className={cn("rounded-xl", props.className)}
      poster={"/viusalize-frame.png"}
    >
      <source src={process.env.NEXT_PUBLIC_DEMO_VIDEO_URL} type="video/mp4" />
    </video>
  );
}
