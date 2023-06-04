import { Component } from "@angular/core";
import {PopularTagsComponent} from "../popular-tags/popular-tags.component";
import {FeedComponent} from "../feed/feed.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {TheHeaderComponent} from "../the-header/the-header.component";

@Component({
  standalone: true,
  imports: [PopularTagsComponent, FeedComponent, NavbarComponent, TheHeaderComponent],
  selector: "app-layout",
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {}
