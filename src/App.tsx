import { IssueTrackerPage } from "@/IssueTracker/page";
import { ThemeProvider } from "@/providers/theme-provider";
import { UserDropdown } from "./components/user-dropdown";
import Logo from "./components/logo";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex w-full h-screen bg-card overflow-hidden">
          <div className="flex flex-col w-full h-[calc(100vh-1.5rem)] m-3 rounded-3xl bg-background overflow-hidden">
            <header className="flex w-full justify-between p-4">
              <Logo />
              <UserDropdown />
            </header>
            <main className="py-6 px-10 overflow-auto">
              <IssueTrackerPage />
            </main>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
