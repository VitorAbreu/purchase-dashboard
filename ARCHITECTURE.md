# Project Architecture Overview

## Project Structure

- **Core**: Contains essential modules required at app initialization. Currently, it includes only the `TasksModule`, which is loaded with the initial bundle.
- **Features**: Houses secondary components and modules, all configured for **lazy loading**. This separation allows better scalability and reduces the initial load time.
- **Shared**: Common utilities, models, interfaces, and mock data are placed here for reuse across modules.

## Key Decisions

- **Sidenav Handling**: Used `BreakpointObserver` to handle responsive side navigation. In hindsight, converting this logic to **signals** would improve reactivity.
- **Change Detection**: Currently using the default strategy. Switching to `OnPush` would reduce unnecessary change detection cycles and improve performance.
- **Styling**: Did not use TailwindCSS due to make design tokens. Using Tailwind in the future would streamline styling and make the layout more consistent.
- **Theme Implementation**:
  - Dark theme: The color palette could be improved; it ended up mostly black with minimal variation.
  - Light theme: Similarly, mostly white without much differentiation between elements.

## Opportunities for Scaling / Refactoring

- **OnPush Change Detection**: Refactor components to use `OnPush` to improve performance, especially in large tables or frequently updated views.
- **TailwindCSS Integration**: Implement TailwindCSS with design tokens to improve layout consistency, spacing, and responsiveness.
- **Enhanced Theming**: Redefine color palettes for dark and light themes to provide better contrast and visual hierarchy.
- **RxJS Usage**: Increase usage of RxJS for reactive streams, particularly in forms and table updates.
- **Unit Tests**: Expand unit testing coverage for components and services to ensure robustness during future refactors.

---

This architecture allows modular development with lazy-loaded features, providing scalability and maintainability while keeping the initial bundle lightweight.
