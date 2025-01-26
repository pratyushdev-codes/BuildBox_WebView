"use client"

import {
  FolderOpen,
  Save,
  Image,
  Users,
  Command,
  Search,
  HelpCircle,
  Trash,
  Github,
  MessageCircle,
  UserPlus,
} from "lucide-react"

export default function Sidebar() {
  const menuItems = [
    { icon: FolderOpen, label: "Open", shortcut: "Cmd+O" },
    { icon: Save, label: "Save to...", shortcut: "" },
    { icon: Image, label: "Export image...", shortcut: "Cmd+Shift+E" },
    { icon: Users, label: "Live collaboration...", shortcut: "" },
    { icon: Command, label: "Command palette", shortcut: "Cmd+/" },
    { icon: Search, label: "Find on canvas", shortcut: "Cmd+F" },
    { icon: HelpCircle, label: "Help", shortcut: "?" },
    { icon: Trash, label: "Reset the canvas", shortcut: "" },
  ]

  const bottomItems = [
    { icon: Github, label: "GitHub" },
    { icon: MessageCircle, label: "Discord chat" },
    { icon: UserPlus, label: "Sign up" },
  ]

  return (
    <div className="fixed left-4 top-4 bottom-4 w-64 bg-neutral-900 rounded-lg shadow-xl border border-neutral-800 flex flex-col  hidden lg:flex">
      <div className="flex-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-800 rounded-md"
          >
            <item.icon className="w-4 h-4" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.shortcut && <span className="text-xs text-neutral-600">{item.shortcut}</span>}
          </button>
        ))}
      </div>
      <div className="p-2 border-t border-neutral-800">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-800 rounded-md"
          >
            <item.icon className="w-4 h-4" />
            <span className="flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

