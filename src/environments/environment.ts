// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// !codigo original del proyecto
/* export const environment = {
  production: false
}; */

//! codigo prueba
export const environment = {
  API_PROTOCOL: 'http',
  API_HOST: 'localhost',
  API_PORT: 8080,
  API_VERSION: 1,
  //MAP_API_KEY: 'AIzaSyBrfUxW92sWif6epUCe2Bbz15j-xnI-CUc',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
