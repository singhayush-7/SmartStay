import { configureStore } from "@reduxjs/toolkit";

import propertyReducer from "../features/property/propertySlice";
import roomReducer from "../features/room/roomSlice";
import profileReducer from "../features/profile/profileSlice";
import bookingReducer from "../features/booking/bookingSlice";
import complaintReducer from "../features/complaint/complaintSlice";
import paymentReducer from "../features/payment/paymentSlice";
import maintenanceReducer from "../features/maintenance/maintenanceSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    room: roomReducer,
    booking: bookingReducer,
    profile: profileReducer,
    complaint: complaintReducer,
    maintenance: maintenanceReducer,
    payment: paymentReducer,
    analytics: analyticsReducer,
  },
});