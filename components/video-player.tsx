import { cn } from "@/lib/utils";

export default function VideoPlayer({ ...props }) {
  return (
    <video
      {...props}
      muted
      autoPlay
      loop
      className={cn("rounded-xl", props.className)}
      poster={"/builder-frame-light.png"}
    >
      <source src={"/demo-light.mov"} type="video/mp4" />
    </video>
  );
}
