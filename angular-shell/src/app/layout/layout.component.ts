import { Component } from "@angular/core";
import {PopularTagsComponent} from "../popular-tags/popular-tags.component";
import {FeedComponent} from "../feed/feed.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  standalone: true,
  imports: [PopularTagsComponent, FeedComponent, NavbarComponent],
  selector: "app-layout",
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {}
