import { User, Settings, Bell, HelpCircle, LogOut } from "lucide-react";

export default function Profile() {
  const menuItems = [
    { icon: User, label: "Edit Profile", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
    { icon: LogOut, label: "Log Out", href: "#", danger: true },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <header className="sticky top-0 z-40 border-b border-elev bg-background/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold font-display">Profile</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        <div className="flex flex-col items-center py-8 mb-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-1">Guest User</h2>
          <p className="text-sm text-muted-foreground">guest@example.com</p>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 p-4 rounded-xl hover:bg-secondary/50 transition-colors ${
                item.danger ? "text-destructive" : ""
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-secondary/30 text-center">
          <p className="text-xs text-muted-foreground">
            Version 1.0.0 • RiceDirect
          </p>
        </div>
      </main>
    </div>
  );
}
