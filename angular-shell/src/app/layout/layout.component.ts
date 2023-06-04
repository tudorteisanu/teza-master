import { Component } from "@angular/core";
import { ProfileUserComponent } from "../profile-user/profile-user.component";
import { SettingsComponent } from "../settings/settings.component";
import {PopularTagsComponent} from "../popular-tags/popular-tags.component";

@Component({
  standalone: true,
  imports: [SettingsComponent, ProfileUserComponent, PopularTagsComponent],
  selector: "app-layout",
  template: `<app-profile-user></app-profile-user>
  <app-popular-tags></app-popular-tags>
    <app-settings></app-settings>`,
})
export class LayoutComponent {}
