import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import LoginComponent from "@/pages/Layout/LoginComponent.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import AccountManager from "@/pages/AccountManager.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

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
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: AccountManager
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
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
