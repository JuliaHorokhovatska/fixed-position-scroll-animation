import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { provideServerRendering } from "@angular/platform-server";
import { provideServerRoutesConfig } from "@angular/ssr";
import { appConfig } from "./app.config";
import { serverRoutes } from "./app.routes.server";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes),
    importProvidersFrom(NoopAnimationsModule),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
