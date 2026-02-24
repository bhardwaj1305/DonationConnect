import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { WelcomeLogin } from "./screens/WelcomeLogin";
import { Register } from "./screens/Register";
import { DonorDashboard } from "./screens/DonorDashboard";
import { AddDonation } from "./screens/AddDonation";
import { RecipientRequest } from "./screens/RecipientRequest";
import { AdminDriveManagement } from "./screens/AdminDriveManagement";
import { LogisticsPanel } from "./screens/LogisticsPanel";
import { Tracking } from "./screens/Tracking";
import { Feedback } from "./screens/Feedback";
import { RecipientDashboard } from "./screens/RecipientDashboard";
import { AdminDashboard } from "./screens/AdminDashboard";
import { LogisticsDashboard } from "./screens/LogisticsDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: WelcomeLogin,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/donor",
    Component: Layout,
    children: [
      {
        index: true,
        Component: DonorDashboard,
      },
      {
        path: "add-donation",
        Component: AddDonation,
      },
      {
        path: "tracking",
        Component: Tracking,
      },
    ],
  },
  {
    path: "/recipient",
    Component: Layout,
    children: [
      {
        index: true,
        Component: RecipientDashboard,
      },
      {
        path: "request",
        Component: RecipientRequest,
      },
      {
        path: "tracking",
        Component: Tracking,
      },
      {
        path: "feedback",
        Component: Feedback,
      },
    ],
  },
  {
    path: "/admin",
    Component: Layout,
    children: [
      {
        index: true,
        Component: AdminDashboard,
      },
      {
        path: "drives",
        Component: AdminDriveManagement,
      },
    ],
  },
  {
    path: "/logistics",
    Component: Layout,
    children: [
      {
        index: true,
        Component: LogisticsDashboard,
      },
      {
        path: "panel",
        Component: LogisticsPanel,
      },
    ],
  },
]);
