import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar
      className={cn(
        "border-r border-border/50 bg-card/50 backdrop-blur-xl transition-all duration-300",
        !open ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/50">
        {open && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Admin
            </span>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="h-8 w-8 rounded-md border border-border/50 bg-background/50 hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center hover:shadow-medium"
        >
          {!open ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <SidebarContent className="p-4">
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group relative overflow-hidden",
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground shadow-medium"
                          : "hover:bg-secondary/80 hover:shadow-soft"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 transition-all duration-300",
                          isActive(item.url)
                            ? "text-primary-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      {open && (
                        <span
                          className={cn(
                            "font-medium transition-all duration-300",
                            isActive(item.url)
                              ? "text-primary-foreground"
                              : "text-foreground"
                          )}
                        >
                          {item.title}
                        </span>
                      )}
                      {isActive(item.url) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-lg animate-pulse-glow" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}