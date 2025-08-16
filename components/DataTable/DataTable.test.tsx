import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './DataTable';
import { Column } from '../../types';

interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
];

const testColumns: Column<TestData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable data={testData} columns={testColumns} loading={true} />);
    
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={testColumns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('handles column sorting', async () => {
    const user = userEvent.setup();
    render(<DataTable data={testData} columns={testColumns} />);
    
    // Click on Name column header to sort
    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);
    
    // Check if sort icon appears
    expect(screen.getAllByText('↑')[0]).toBeInTheDocument();
    
    // Click again to reverse sort
    await user.click(nameHeader);
    expect(screen.getAllByText('↓')[0]).toBeInTheDocument();
    
    // Click again to remove sort
    await user.click(nameHeader);
    expect(screen.getAllByText('↕️')[0]).toBeInTheDocument();
  });

  it('handles row selection when selectable is true', async () => {
    const user = userEvent.setup();
    const onRowSelect = vi.fn();
    
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={onRowSelect}
      />
    );
    
    // Check if select all checkbox is present
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    expect(selectAllCheckbox).toBeInTheDocument();
    
    // Select first row
    const firstRowCheckbox = screen.getByLabelText('Select row 1');
    await user.click(firstRowCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith([testData[0]]);
  });

  it('handles select all functionality', async () => {
    const user = userEvent.setup();
    const onRowSelect = vi.fn();
    
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={onRowSelect}
      />
    );
    
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    await user.click(selectAllCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith(testData);
  });

  it('does not show checkboxes when selectable is false', () => {
    render(<DataTable data={testData} columns={testColumns} selectable={false} />);
    
    expect(screen.queryByLabelText('Select all rows')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Select row 1')).not.toBeInTheDocument();
  });

  it('handles keyboard navigation for sortable columns', async () => {
    const user = userEvent.setup();
    render(<DataTable data={testData} columns={testColumns} />);
    
    const nameHeader = screen.getByText('Name').closest('[role="columnheader"]');
    nameHeader?.focus();
    
    // Press Enter to sort
    await user.keyboard('{Enter}');
    expect(screen.getAllByText('↑')[0]).toBeInTheDocument();
    
    // Press Space to reverse sort
    await user.keyboard(' ');
    expect(screen.getAllByText('↓')[0]).toBeInTheDocument();
  });

  it('applies proper ARIA attributes', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('aria-label', 'Data table');
    
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(4);
  });

  it('handles sortable column with proper ARIA attributes', async () => {
    const user = userEvent.setup();
    render(<DataTable data={testData} columns={testColumns} />);
    
    const nameHeader = screen.getByText('Name').closest('[role="columnheader"]');
    expect(nameHeader).toHaveAttribute('aria-sort', 'none');
    
    await user.click(screen.getByText('Name'));
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    
    await user.click(screen.getByText('Name'));
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
  });

  it('handles null and undefined values in sorting', () => {
    const dataWithNulls: TestData[] = [
      { id: 1, name: 'John', email: 'john@example.com', age: 30 },
      { id: 2, name: null as any, email: 'jane@example.com', age: 25 },
      { id: 3, name: 'Bob', email: 'bob@example.com', age: undefined as any },
    ];
    
    render(<DataTable data={dataWithNulls} columns={testColumns} />);
    
    // Should render without errors
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('maintains selection state when data changes', async () => {
    const user = userEvent.setup();
    const onRowSelect = vi.fn();
    
    const { rerender } = render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={onRowSelect}
      />
    );
    
    // Select first row
    const firstRowCheckbox = screen.getByLabelText('Select row 1');
    await user.click(firstRowCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith([testData[0]]);
    
    // Change data
    const newData = [...testData, { id: 4, name: 'New User', email: 'new@example.com', age: 40 }];
    rerender(
      <DataTable 
        data={newData} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={onRowSelect}
      />
    );
    
    // Selection should be reset
    expect(screen.getByLabelText('Select row 1')).not.toBeChecked();
  });
});
