import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import LoginComponent from "@/pages/Layout/LoginComponent.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import AccountManager from "@/pages/AccountManager.vue";
import PendingRequest from "@/pages/PendingRequest.vue";
import Activity from "@/pages/Activity.vue";
import CheckInForStaff from "@/pages/CheckInForStaff.vue";
import SearchCustomer from "@/pages/SearchCustomer.vue";
import Report from "@/pages/Report.vue";
import Notifications from "@/pages/Notifications.vue";
import Services from "@/pages/Services.vue";



const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Layout/LoginComponent.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('username')) {
        next({ name: 'Dashboard' });
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
        path: "services",
        name: "Dịch vụ",
        component: Services
      },
      {
        path: "schedule",
        name: "Lịch hẹn",
        component: UserProfile
      },
      {
        path: "account",
        name: "Tài khoản",
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
        path: "pendingRequest",
        name: "Chờ được duyệt",
        component: PendingRequest
      },
      {
        path: "report",
        name: "Thống kê",
        component: Report
      },
      {
        path: "customerDetails",
        name: "Chi thiết khách hàng",
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
      },
      {
        path: "activity",
        name: "Hoạt động",
        component: Activity
      },
      {
        path: "/404",
        name: "errorpage",
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/404.vue"),
      },
      {
        path: "*",
        redirect: "/404",
      },
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
