import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  guestName = "Invitado";

  constructor() {
    const rawGuestName = this.extractGuestNameFromPath();
    if (rawGuestName) {
      this.guestName = this.formatGuestName(rawGuestName);
    }
  }

  private extractGuestNameFromPath(): string | null {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const guestSegment = pathSegments.pop();

    if (!guestSegment) {
      return null;
    }

    const withoutExtension = guestSegment.replace(/\.[^.\/\\]+$/, "");
    if (!withoutExtension) {
      return null;
    }

    return decodeURIComponent(withoutExtension.replace(/\+/g, " ")).trim();
  }

  private formatGuestName(value: string): string {
    return value
      .replace(/[-_]+/g, " ")
      .replace(/(\p{Ll})(\p{Lu})/gu, "$1 $2")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((word) => (word ? word.charAt(0).toLocaleUpperCase("es-CO") + word.slice(1) : ""))
      .join(" ");
  }
}
