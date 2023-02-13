import { animate, style, transition, trigger } from "@angular/animations";

export const RoutingAnimation = trigger("routing", [
  transition("*<=>*", [
    style({ opacity: 0, transform: "translateX(-30px)" }),
    animate("500ms", style({ opacity: 1, transform: "translateX(0px)" }))
  ])
]);
