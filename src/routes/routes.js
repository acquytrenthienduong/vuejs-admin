import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import LoginComponent from "@/pages/Layout/LoginComponent.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import StaffSchedule from "@/pages/StaffSchedule.vue";
import AccountManager from "@/pages/AccountManager.vue";
import PendingRequest from "@/pages/PendingRequest.vue";
import CheckInForStaff from "@/pages/CheckInForStaff.vue";
import SearchCustomer from "@/pages/SearchCustomer.vue";
import Products from "@/pages/Products.vue";
import Notifications from "@/pages/Notifications.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Layout/LoginComponent.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('username')) {
        next({ name: 'dashboard' });
      }
      else {
        next();
      }
    }
  },
  {
    path: "/",
    name: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "schedule",
        name: "Schedule",
        component: UserProfile
      },
      {
        path: "lichlamviec",
        name: "lichlamviec",
        component: StaffSchedule
      },
      {
        path: "account",
        name: "Account Manager",
        component: AccountManager,
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('role') != 'admin') {
            next({ name: 'Dashboard' });
          }
          else {
            next();
          }
        }
      },
      {
        path: "typography",
        name: "Typography",
        component: PendingRequest
      },
      {
        path: "products",
        name: "Products",
        component: Products
      },
      {
        path: "maps",
        name: "Maps",
        component: SearchCustomer
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "checkintaff",
        name: "CheckInForStaff",
        component: CheckInForStaff
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('username')) {
        next({ name: 'login' });
      }
      else {
        next();
      }
    }
  }
];

export default routes;
