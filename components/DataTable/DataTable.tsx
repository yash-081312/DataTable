import React, { useState, useMemo, useCallback } from 'react';
import { DataTableProps, SortState, SortDirection } from '../../types';
import './DataTable.css';

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState>({
    key: null,
    direction: null,
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Reset selection when data changes
  React.useEffect(() => {
    setSelectedRows(new Set());
  }, [data]);

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) {
      return data;
    }

    const column = columns.find(col => col.key === sortState.key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, columns, sortState]);

  // Handle column sorting
  const handleSort = useCallback((columnKey: string) => {
    setSortState(prev => {
      if (prev.key === columnKey) {
        if (prev.direction === 'asc') {
          return { key: columnKey, direction: 'desc' };
        } else if (prev.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      return { key: columnKey, direction: 'asc' };
    });
  }, []);

  // Handle row selection
  const handleRowSelect = useCallback((rowIndex: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(rowIndex);
    } else {
      newSelectedRows.delete(rowIndex);
    }
    setSelectedRows(newSelectedRows);

    if (onRowSelect) {
      const selectedData = sortedData.filter((_, index) => newSelectedRows.has(index));
      onRowSelect(selectedData);
    }
  }, [selectedRows, sortedData, onRowSelect]);

  // Handle select all
  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      const allIndices = new Set(sortedData.map((_, index) => index));
      setSelectedRows(allIndices);
      if (onRowSelect) {
        onRowSelect(sortedData);
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  }, [sortedData, onRowSelect]);

  // Get sort icon
  const getSortIcon = (columnKey: string): string => {
    if (sortState.key !== columnKey) return '↕️';
    return sortState.direction === 'asc' ? '↑' : '↓';
  };

  // Loading state
  if (loading) {
    return (
      <div className="datatable-container" role="table" aria-label="Data table loading">
        <div className="datatable-loading">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="datatable-container" role="table" aria-label="Data table empty">
        <div className="datatable-empty">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="datatable-container" role="table" aria-label="Data table">
      <div className="datatable-header" role="row">
        {selectable && (
          <div className="datatable-cell datatable-cell-header datatable-cell-checkbox" role="columnheader">
            <input
              type="checkbox"
              checked={selectedRows.size === sortedData.length && sortedData.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              aria-label="Select all rows"
            />
          </div>
        )}
        {columns.map((column) => (
          <div
            key={column.key}
            className={`datatable-cell datatable-cell-header ${
              column.sortable ? 'datatable-cell-sortable' : ''
            }`}
            role="columnheader"
            onClick={() => column.sortable && handleSort(column.key)}
            tabIndex={column.sortable ? 0 : undefined}
            onKeyDown={(e) => {
              if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleSort(column.key);
              }
            }}
            aria-sort={
              sortState.key === column.key
                ? sortState.direction === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            <span>{column.title}</span>
            {column.sortable && (
              <span className="sort-icon" aria-hidden="true">
                {getSortIcon(column.key)}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="datatable-body">
        {sortedData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`datatable-row ${
              selectedRows.has(rowIndex) ? 'datatable-row-selected' : ''
            }`}
            role="row"
            aria-selected={selectedRows.has(rowIndex)}
          >
            {selectable && (
              <div className="datatable-cell datatable-cell-checkbox">
                <input
                  type="checkbox"
                  checked={selectedRows.has(rowIndex)}
                  onChange={(e) => handleRowSelect(rowIndex, e.target.checked)}
                  aria-label={`Select row ${rowIndex + 1}`}
                />
              </div>
            )}
            {columns.map((column) => (
              <div
                key={column.key}
                className="datatable-cell"
                role="cell"
                data-label={column.title}
              >
                {String(row[column.dataIndex] ?? '')}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
