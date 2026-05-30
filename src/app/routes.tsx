import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import WorkspaceLayout from "./components/WorkspaceLayout";
import WorkspaceHome from "./pages/WorkspaceHome";
import Chat from "./pages/Chat";
import Projects from "./pages/Projects";
import History from "./pages/History";
import Agents from "./pages/Agents";
import Memory from "./pages/Memory";
import Balance from "./pages/Balance";
import Settings from "./pages/Settings";

const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/about",
      Component: About,
    },
    {
      path: "/workspace",
      Component: WorkspaceLayout,
      children: [
        { index: true, Component: WorkspaceHome },
        { path: "chat", Component: Chat },
        { path: "projects", Component: Projects },
        { path: "history", Component: History },
        { path: "agents", Component: Agents },
        { path: "memory", Component: Memory },
        { path: "balance", Component: Balance },
        { path: "settings", Component: Settings },
      ],
    },
  ],
  { basename },
);
