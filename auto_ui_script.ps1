$components = @("accordion", "alert", "alert-dialog", "aspect-ratio", "avatar", "badge", "breadcrumb", "button", "calendar", "card", "carousel", "chart", "checkbox", "collapsible", "combobox", "command", "context-menu", "data-table", "date-picker", "dialog", "drawer", "dropdown-menu", "form", "hover-card", "input", "input-otp", "label", "menubar", "navigation-menu", "pagination", "popover", "progress", "radio-group", "resizable", "scroll-area", "select", "separator", "sheet", "sidebar", "skeleton", "slider", "sonner", "switch", "table", "tabs", "textarea", "toast", "toggle", "toggle-group", "tooltip")

foreach ($component in $components) {
  npx shadcn@latest add $component
}