import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { Dock, DockIcon } from "@/components/ui/dock"
import { IconHome, IconUser, IconBriefcase, IconFolderCode, IconBook, IconMail } from "@tabler/icons-react"

const navItems = [
  { icon: <IconHome size={18} />, label: "Home", href: "#hero" },
  { icon: <IconUser size={18} />, label: "About", href: "#about" },
  { icon: <IconBriefcase size={18} />, label: "Experience", href: "#experience" },
  { icon: <IconFolderCode size={18} />, label: "Projects", href: "#projects" },
  { icon: <IconBook size={18} />, label: "Blog", href: "#blog" },
  { icon: <IconMail size={18} />, label: "Contact", href: "#contact" },
]

function App() {
  return (
    <>
      <SmoothCursor />
      {/* Page content injected here by section components */}
      <Dock
        iconSize={36}
        iconMagnification={52}
        iconDistance={130}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      >
        {navItems.map((item) => (
          <DockIcon key={item.label}>
            <a
              href={item.href}
              aria-label={item.label}
              className="flex items-center justify-center"
            >
              {item.icon}
            </a>
          </DockIcon>
        ))}
      </Dock>
    </>
  )
}

export default App