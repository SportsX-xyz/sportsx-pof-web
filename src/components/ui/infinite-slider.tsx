import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InfiniteSliderProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: string;
}

export function InfiniteSlider({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  duration = "40s",
}: InfiniteSliderProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 95%)",
      }}
    >
      <div
        className={cn(
          "flex shrink-0 animate-scroll items-center justify-around gap-4",
          reverse && "animate-scroll-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: duration,
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 animate-scroll items-center justify-around gap-4",
          reverse && "animate-scroll-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: duration,
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}