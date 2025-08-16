import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { Column } from '../../types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-12' },
];

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status', sortable: true },
  { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner when true',
    },
    selectable: {
      control: 'boolean',
      description: 'Enables row selection with checkboxes',
    },
    onRowSelect: {
      action: 'row selected',
      description: 'Callback when rows are selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: sampleData,
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};

export const MixedSortable: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
      { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
      { key: 'status', title: 'Status', dataIndex: 'status', sortable: false },
      { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
    ],
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Manager' : 'User',
      status: i % 4 === 0 ? 'inactive' : 'active',
      lastLogin: `2024-01-${String(i % 28 + 1).padStart(2, '0')}`,
    })),
    columns,
    selectable: true,
  },
};

export const WithNullValues: Story = {
  args: {
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
      { id: 2, name: null as any, email: 'jane@example.com', role: 'User', status: 'active', lastLogin: null as any },
      { id: 3, name: 'Bob Johnson', email: null as any, role: 'Manager', status: 'inactive', lastLogin: '2024-01-10' },
    ],
    columns,
  },
};
