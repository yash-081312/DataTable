import React, { useState } from 'react';
import { DataTable } from '../DataTable/DataTable';
import { Column } from '../../types';
import './Demo.css';

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

export function Demo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>(sampleData);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [showEmpty, setShowEmpty] = useState(false);

  const handleRowSelect = (selected: User[]) => {
    setSelectedRows(selected);
  };

  const toggleLoading = () => {
    setLoading(!loading);
  };

  const toggleEmpty = () => {
    setShowEmpty(!showEmpty);
    if (!showEmpty) {
      setData([]);
    } else {
      setData(sampleData);
    }
  };

  const resetData = () => {
    setData(sampleData);
    setShowEmpty(false);
  };

  return (
    <div className="demo-container">
      <h1>DataTable Component Demo</h1>
      
      <div className="demo-controls">
        <button onClick={toggleLoading} className="demo-button">
          {loading ? 'Stop Loading' : 'Show Loading'}
        </button>
        <button onClick={toggleEmpty} className="demo-button">
          {showEmpty ? 'Show Data' : 'Show Empty'}
        </button>
        <button onClick={resetData} className="demo-button">
          Reset Data
        </button>
      </div>

      <div className="demo-info">
        <h3>Features:</h3>
        <ul>
          <li>✅ Column sorting (click on sortable column headers)</li>
          <li>✅ Row selection (checkboxes)</li>
          <li>✅ Loading state</li>
          <li>✅ Empty state</li>
          <li>✅ Responsive design</li>
          <li>✅ Accessibility (ARIA labels, keyboard navigation)</li>
        </ul>
      </div>

      <div className="demo-table">
        <h3>User Data Table</h3>
        <DataTable
          data={data}
          columns={columns}
          loading={loading}
          selectable={true}
          onRowSelect={handleRowSelect}
        />
      </div>

      {selectedRows.length > 0 && (
        <div className="demo-selection">
          <h3>Selected Rows ({selectedRows.length})</h3>
          <div className="selected-items">
            {selectedRows.map((user) => (
              <div key={user.id} className="selected-item">
                {user.name} ({user.email})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
