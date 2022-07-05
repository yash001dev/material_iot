import { configureStore } from "@reduxjs/toolkit"; // Redux toolkit intigration
import { setupListeners } from "@reduxjs/toolkit/query";
import { deviceApi } from "./service/device";
/** ****************
@purpose : Configuration of reduxjs store
@Parameter : {reducer, middleware}
@Author : Dhaval Sarvaiya
***************** */
export const store = configureStore({
  reducer: {
    [deviceApi.reducerPath]: deviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deviceApi.middleware),
});
setupListeners(store.dispatch);
