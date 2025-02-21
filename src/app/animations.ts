import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const ROLL_IN = trigger("rollIn", [
  state(
    "hidden",
    style({
      transform: "translateY(100%)",
      opacity: 0,
      overflow: "hidden",
    })
  ),
  state(
    "visible",
    style({
      transform: "translateY(0)",
      opacity: 1,
      overflow: "hidden",
    })
  ),
  transition("hidden => visible", [animate("0.5s ease-in-out")]),
]);

export const FADE_IN_WORDS = trigger("fadeInWords", [
  transition("hidden => start", [
    query("span", [
      style({ opacity: 0, transform: "translateY(20px)" }),
      stagger(50, [
        animate(
          "600ms cubic-bezier(0, 0, 1, 1)",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
    ]),
  ]),
]);
