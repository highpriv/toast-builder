import type { AnimationType } from "../types/toast";
import { ANIMATION_PRESETS } from "../constants/animation-presets";

export const useAnimation = () => {
  const getAnimationClasses = (animation: AnimationType = "fade") => {
    const preset = ANIMATION_PRESETS[animation];
    return {
      enterClass: preset.enterClass,
      exitClass: preset.exitClass,
    };
  };

  const getAnimationDuration = (animation: AnimationType = "fade"): number => {
    return ANIMATION_PRESETS[animation].duration;
  };

  return {
    getAnimationClasses,
    getAnimationDuration,
  };
};
