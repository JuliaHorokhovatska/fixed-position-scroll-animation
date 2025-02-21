import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { Card } from "../../app.component";

@Component({
  selector: "app-card",
  imports: [CommonModule],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  card = input.required<Card>();

  titleSentence: Signal<string[]> = computed(() => {
    return this.card()
      .title.split(".")
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);
  });
  titleIsLong: Signal<boolean> = computed(() => this.card().title.length > 50);
}
