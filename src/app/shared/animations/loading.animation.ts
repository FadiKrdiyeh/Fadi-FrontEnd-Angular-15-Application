import { animate, style, transition, trigger } from "@angular/animations";

/**
 * Animate loading component when show and hide
 * Animation name: fadeLoading
 * @export
 * @const LoadingAnimation
 */
export const LoadingAnimation = trigger("fadeLoading", [
  transition(":leave", [
    style({ opacity: 1 }),
    animate("500ms", style({ opacity: 0 }))
  ])
]);
