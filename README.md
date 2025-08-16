# DataTable Component

A modern, accessible, and feature-rich DataTable component built with React and TypeScript. This component provides a clean and responsive table interface with sorting, selection, loading states, and comprehensive accessibility features.

## Features

- ✅ **Column Sorting**: Click on sortable column headers to sort data
- ✅ **Row Selection**: Single and multiple row selection with checkboxes
- ✅ **Loading State**: Built-in loading spinner and state management
- ✅ **Empty State**: Graceful handling of empty datasets
- ✅ **Responsive Design**: Mobile-friendly layout with responsive breakpoints
- ✅ **Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatibility
- ✅ **TypeScript**: Fully typed with proper TypeScript interfaces
- ✅ **Modern Styling**: Clean, modern design with hover effects and transitions

## Installation

```bash
npm install datatable-component
# or
yarn add datatable-component
```

## Quick Start

```tsx
import { DataTable, Column } from 'datatable-component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
];

function App() {
  return (
    <DataTable
      data={data}
      columns={columns}
      selectable={true}
      onRowSelect={(selectedRows) => console.log('Selected:', selectedRows)}
    />
  );
}
```

## API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | - | Array of data objects to display |
| `columns` | `Column<T>[]` | - | Column configuration array |
| `loading` | `boolean` | `false` | Shows loading spinner when true |
| `selectable` | `boolean` | `false` | Enables row selection with checkboxes |
| `onRowSelect` | `(selectedRows: T[]) => void` | - | Callback when rows are selected |

### Column Interface

```tsx
interface Column<T> {
  key: string;           // Unique identifier for the column
  title: string;         // Display title for the column header
  dataIndex: keyof T;    // Property key from the data object
  sortable?: boolean;    // Whether the column is sortable (default: false)
}
```

## Usage Examples

### Basic Table

```tsx
<DataTable data={data} columns={columns} />
```

### With Row Selection

```tsx
<DataTable
  data={data}
  columns={columns}
  selectable={true}
  onRowSelect={(selectedRows) => {
    console.log('Selected rows:', selectedRows);
  }}
/>
```

### Loading State

```tsx
<DataTable
  data={data}
  columns={columns}
  loading={true}
/>
```

### Mixed Sortable Columns

```tsx
const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: false }, // Not sortable
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
];
```

## Accessibility Features

- **ARIA Labels**: Proper `aria-label` attributes for table and interactive elements
- **Keyboard Navigation**: Full keyboard support for sorting and selection
- **Screen Reader Support**: Semantic HTML structure with proper roles
- **Focus Management**: Visible focus indicators for all interactive elements
- **High Contrast Support**: CSS media queries for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Responsive Design

The DataTable component is fully responsive and adapts to different screen sizes:

- **Desktop**: Traditional table layout with headers and rows
- **Mobile**: Card-based layout with stacked information
- **Tablet**: Optimized layout for medium screens

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd datatable-component
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

5. Start Storybook:
```bash
npm run storybook
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## Testing

The component includes comprehensive tests covering:

- Component rendering
- Column sorting functionality
- Row selection behavior
- Loading and empty states
- Accessibility features
- Keyboard navigation
- Responsive behavior

Run tests with:
```bash
npm test
```

## Storybook

The component includes Storybook stories showcasing all features:

- Default table
- With row selection
- Loading state
- Empty state
- Mixed sortable columns
- Large datasets
- Null value handling

Start Storybook with:
```bash
npm run storybook
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Changelog

### 1.0.0
- Initial release
- Column sorting functionality
- Row selection with checkboxes
- Loading and empty states
- Responsive design
- Accessibility features
- TypeScript support
