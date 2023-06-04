import {
  NgModule,
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { loadRemoteModule } from "./utils/federation-utils";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./layout/layout.component").then((m) => m.LayoutComponent),
  },
];

export function initializeApp(): () => void {
  return () => {
    loadRemoteModule({
      remoteEntry: "http://localhost:3001/remoteEntry.js",
      remoteName: "react_components",
      exposedModule: "./PopularTagsComponent",
    });
    loadRemoteModule({
      remoteEntry: "http://localhost:3002/remoteEntry.js",
      remoteName: "vue_components",
      exposedModule: "./Feed",
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, // Added for custom elements support
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
