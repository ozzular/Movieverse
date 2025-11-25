# Fixed Sidebar Layout - Complete Structure

## HTML Structure

```html
<div class="min-h-screen bg-background text-foreground overflow-x-hidden">
  <!-- Fixed Sidebar (never scrolls) -->
  <div class="sidebar fixed left-0 top-0 h-full z-50 bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-hidden transition-transform duration-300 ease-in-out w-[220px] lg:translate-x-0">
    <div class="h-full flex flex-col">
      <!-- Sidebar content goes here -->
    </div>
  </div>

  <!-- Hamburger Menu Button -->
  <button class="hamburger fixed top-4 left-4 z-60 p-2 bg-background border border-border rounded-md shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors">
    <!-- Menu or X icon -->
  </button>

  <!-- Main Content Area (ONLY scrollable section) -->
  <div class="main-content flex flex-col min-h-screen">
    <!-- Top Navigation -->
    <div class="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav class="w-full h-16 glass-effect border-b border-border">
        <!-- Navbar content -->
      </nav>
    </div>

    <!-- Scrollable Content Area -->
    <div class="flex-1 flex flex-col overflow-y-auto">
      <!-- Breadcrumb -->
      <!-- Main content (only this section scrolls) -->
      <!-- Footer -->
    </div>
  </div>

  <!-- Chatbot (overlay) -->
  <!-- Modal overlays -->
</div>
```

## CSS Structure

```css
/* Root container */
.min-h-screen {
  min-height: 100vh;
}

.bg-background {
  background-color: hsl(0 0% 8%);
}

.text-foreground {
  color: hsl(0 0% 95%);
}

/* Fixed sidebar */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 50;
  background: hsl(0 0% 8% / 0.4);
  border-right: 1px solid hsl(0 0% 100% / 0.1);
  overflow: hidden;
  transition: transform 300ms ease-in-out;
  width: 220px;
}

.sidebar.closed {
  transform: translateX(-100%);
}

.sidebar.open {
  transform: translateX(0);
}

/* Hamburger button */
.hamburger {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 60;
  padding: 0.5rem;
  background: hsl(0 0% 12%);
  border: 1px solid hsl(0 0% 20%);
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 150ms;
}

.hamburger:hover {
  background: hsl(0 72% 51%);
  color: hsl(0 0% 100%);
}

/* Main content */
.main-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 0; /* Starts at 0, sidebar overlays on mobile */
}

@media (min-width: 1024px) {
  .main-content {
    margin-left: 220px; /* Account for fixed sidebar on desktop */
  }
}

/* Only scrollable section */
.overflow-y-auto {
  overflow-y: auto;
}

/* Prevent horizontal scroll */
.overflow-x-hidden {
  overflow-x: hidden;
}
```

## JavaScript/React Structure

```tsx
// Context for sidebar state
const SidebarContext = createContext<SidebarContextType | null>(null);

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Main layout component
export const FixedSidebarLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Sidebar with slide animation */}
        <div className={`sidebar fixed left-0 top-0 h-full z-50 bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-[220px] lg:translate-x-0`}>
          <Sidebar />
        </div>

        {/* Hamburger button */}
        <button
          className="hamburger fixed top-4 left-4 z-60 p-2 bg-background border border-border rounded-md shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Main content area */}
        <div className="main-content flex flex-col min-h-screen">
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
            <Navbar />
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto">
            <Breadcrumb />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
            <Footer />
          </div>
        </div>

        {/* Mobile overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </SidebarContext.Provider>
  );
};
```

## Key Features

1. **Fixed Sidebar**: Never scrolls, always visible on desktop, slides in on mobile
2. **Hamburger Menu**: Toggle button with smooth animation
3. **Only Main Content Scrolls**: Sidebar remains fixed while content area scrolls independently
4. **Responsive Design**: Desktop shows sidebar, mobile uses hamburger
5. **Overlay Click**: Clicking overlay closes sidebar on mobile
6. **Transform Animation**: Uses `translateX(-100%)` for closed state, `translateX(0)` for open state

## Layout Flow

1. User clicks hamburger button → toggles `isOpen` state
2. Sidebar slides in/out using CSS transforms
3. Overlay appears behind sidebar on mobile
4. Clicking overlay or X button closes sidebar
5. Main content area scrolls independently of sidebar
6. Navbar is sticky and stays at top while content scrolls

## Files Modified

- `src/components/FixedSidebarLayout.tsx` - New fixed layout component
- `src/components/Layout.tsx` - Updated to use new layout
- `src/components/Sidebar.tsx` - Updated for new context and mobile behavior
- `src/components/Navbar.tsx` - Removed fixed positioning, added mobile spacer