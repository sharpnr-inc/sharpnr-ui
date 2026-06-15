import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./sidebar";
import { SharpnrSidebarFooter } from "./SharpnrSidebarFooter";
import { Home, Settings, Users, FileText } from "lucide-react";

const meta = {
  title: "UI/SharpnrSidebarFooter",
  component: SharpnrSidebarFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Branded 'Powered by Sharpnr' footer for the shadcn sidebar. " +
          "Renders an animated card when the sidebar is expanded and collapses " +
          "to a single tooltipped logo tile that fits the icon rail. On mobile " +
          "(sheet) it always shows the full layout. Animations respect " +
          "`prefers-reduced-motion`.",
      },
    },
  },
  argTypes: {
    href: { control: "text" },
    label: { control: "text" },
    brand: { control: "text" },
    logoSrc: { control: "text" },
  },
} satisfies Meta<typeof SharpnrSidebarFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A small reusable sidebar shell so the footer is shown in a realistic context. */
function SidebarShell({
  defaultOpen = true,
  footerArgs,
}: {
  defaultOpen?: boolean;
  footerArgs: React.ComponentProps<typeof SharpnrSidebarFooter>;
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    S
                  </div>
                  <span className="font-semibold">SharpNR</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Dashboard">
                      <Home />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Users">
                      <Users />
                      <span>Users</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Documents">
                      <FileText />
                      <span>Documents</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SharpnrSidebarFooter {...footerArgs} />

          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="font-semibold">
              Toggle the sidebar to see the footer collapse
            </span>
          </header>
          <main className="p-4 text-sm text-muted-foreground">
            Use the trigger in the header (or the rail) to switch between the
            expanded and collapsed states.
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

/** Default expanded sidebar with the animated footer card. */
export const Expanded: Story = {
  render: (args) => <SidebarShell defaultOpen footerArgs={args} />,
};

/** Sidebar collapsed to the icon rail — footer becomes a tooltipped logo tile. */
export const Collapsed: Story = {
  render: (args) => <SidebarShell defaultOpen={false} footerArgs={args} />,
};

/** Custom brand, label, and link. */
export const Customized: Story = {
  args: {
    label: "Built with",
    brand: "Acme Corp",
    href: "https://example.com",
  },
  render: (args) => <SidebarShell defaultOpen footerArgs={args} />,
};

/** Non-interactive (no link) — pass `href={null}`. */
export const NonInteractive: Story = {
  args: {
    href: null,
  },
  render: (args) => <SidebarShell defaultOpen footerArgs={args} />,
};
