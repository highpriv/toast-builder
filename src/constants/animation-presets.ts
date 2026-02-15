import type { AnimationType } from "@/types/toast";
import type { AnimationStrategy } from "@/types/animation";

export const ANIMATION_PRESETS: Record<AnimationType, AnimationStrategy> = {
  fade: {
    enterClass: "toast-fade-enter",
    exitClass: "toast-fade-exit",
    duration: 300,
  },
  slide: {
    enterClass: "toast-slide-enter",
    exitClass: "toast-slide-exit",
    duration: 400,
  },
  bounce: {
    enterClass: "toast-bounce-enter",
    exitClass: "toast-bounce-exit",
    duration: 500,
  },
} as const;
