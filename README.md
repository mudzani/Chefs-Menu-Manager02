# Chef's Menu Manager

## Project Overview

Chef's Menu Manager is a React Native application for creating and maintaining a restaurant menu. It is intended for restaurant staff or menu managers who need a simple way to organize dishes, search and filter the menu, and review menu-level price and course summaries.

## Features

- Add menu items with a dish name, description, course, and price.
- Validate required form fields and reject invalid or negative prices.
- Select from the fixed courses: Starter, Main Course, and Dessert.
- Edit existing menu items while preserving their stable IDs.
- Delete menu items after confirming the dish name in a confirmation dialog.
- Search dish names with case-insensitive, partial matching.
- Filter by course, or combine a course filter with the search query.
- Clear the search and course filters together.
- View total item count, average price, and counts by course. Statistics reflect the complete menu, not filtered results.
- Use reusable menu item cards with Edit and Delete actions.
- Use responsive list and form layouts, with distinct empty-menu and no-results states.
- Return to the menu from an Add or Edit form. If form values have changed, confirm before discarding them.

## Technology Stack

Versions below are those declared in `package.json`.

- Expo SDK `~58.0.22`
- React Native `0.88.1`
- React `19.3.0`
- TypeScript `~6.0.3`
- Expo Router `~58.0.29`
- React Native Web `^0.21.4`
- React Native Reanimated `4.7.1`
- React Native Gesture Handler `~3.3.0`
- React Native Screens `~4.30.1`
- React Native Safe Area Context `~5.10.1`
- Expo modules for UI, fonts, images, splash screen, device information, and system integration

## Installation and Setup

### Prerequisites

- Git
- Node.js and npm
- Android Studio with an Android emulator configured, or a connected Android device
- Expo Go or a compatible development client on the Android target

### Clone and install

```bash
git clone https://github.com/mudzani/Chefs-Menu-Manager02.git
cd Chefs-Menu-Manager02
npm install
```

### Start the app

Start the Expo development server:

```bash
npm start
```

To launch on an available Android emulator, start the emulator first, then run:

```bash
npm run android
```

Alternatively, run `npm start` and press `a` in the Expo terminal to open the app on Android.

## Application Usage

1. Select **Add your first menu item** or **+ Add menu item**.
2. Enter the dish name and description, choose Starter, Main Course, or Dessert, and enter a price of zero or more.
3. Select **Save item**. Missing or invalid fields are shown next to the relevant inputs and prevent saving.
4. On the menu, use **Edit** to load an item's current details. Save changes to update that item while retaining its ID.
5. Use **Delete** to open a confirmation prompt naming the dish. Confirm to remove it, or cancel to keep it.
6. Enter part of a dish name in the search field to find matching dishes. Matching ignores letter case and surrounding query spaces.
7. Choose **All**, **Starter**, **Main Course**, or **Dessert** to filter by course. Search and course selection apply together; **Clear Filters** resets both.
8. Review the menu overview for total items, average price in South African Rand, and item counts by course. These values are based on the full menu.
9. From an Add or Edit form, select **← Back to menu**. If the form has changed, choose **Cancel** to continue editing or **Discard changes** to leave without saving.

## Project Structure

```text
src/
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── MenuItemCard.tsx
│   ├── MenuItemScreen.tsx
│   ├── MenuListScreen.tsx
│   ├── MenuStatistics.tsx
│   ├── animated-icon.module.css
│   ├── animated-icon.tsx
│   ├── animated-icon.web.tsx
│   ├── app-tabs.tsx
│   ├── app-tabs.web.tsx
│   ├── external-link.tsx
│   ├── hint-row.tsx
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   ├── ui/
│   │   └── collapsible.tsx
│   └── web-badge.tsx
├── constants/
│   ├── menuTheme.ts
│   └── theme.ts
├── hooks/
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme.ts
├── utils/
│   └── menuHelpers.ts
├── global.css
└── types.ts
scripts/
└── reset-project.js
```

- `src/app/` contains the Expo Router layout and the application entry screen, which manages menu state and add, edit, and delete actions.
- `src/components/` contains the menu form, list, reusable item card, and statistics presentation, alongside shared Expo starter components.
- `src/types.ts` defines menu item, course, form input, and course-filter types.
- `src/constants/menuTheme.ts` defines the menu palette; `theme.ts` contains the Expo starter theme constants.
- `src/utils/menuHelpers.ts` contains derived menu filtering, statistics calculations, and price formatting.
- `src/hooks/` contains color-scheme hooks used by the shared Expo components.
- `scripts/reset-project.js` is the available starter-project reset script.

## Data Management and Limitations

Menu items are stored in in-memory React state. They remain available while the running app retains that state, but are **not permanently stored**. Restarting the application resets the menu. This project does not currently implement a database, local persistent storage, or cloud synchronization.



## Changelog

- Added typed menu courses, form validation, and stable IDs for menu items.
- Added editing with prefilled form values and ID preservation.
- Added confirmed deletion and cancellation.
- Added dish-name search and combined course filtering with a clear-filters action.
- Added complete-menu statistics for item count, average price, and course counts.
- Extracted reusable menu item cards and improved small-screen layout and empty states.
- Added a Back to menu action with confirmation before discarding unsaved form changes.

## Video Demonstration

[YouTube Unlisted Video Link — To be added]

## Repository 

- GitHub repository: [mudzani/Chefs-Menu-Manager02](https://github.com/mudzani/Chefs-Menu-Manager02)
