import { useState } from 'react';
import { Pencil, Trash2, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { _id?: string }> {
  title: string;
  data: T[];
  columns: Column<T>[];
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function DataTable<T extends { _id?: string }>({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  isLoading,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filteredData = data.filter((item) =>
    columns.some((col) => {
      const value = item[col.key as keyof T];
      return String(value || '').toLowerCase().includes(search.toLowerCase());
    })
  );

  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = filteredData.slice((page - 1) * perPage, page * perPage);

  const getValue = (item: T, key: string): React.ReactNode => {
    const keys = key.split('.');
    let value: unknown = item;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }

    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-block font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5 bg-green-100 text-green-800 border border-green-300">Yes</span>
      ) : (
        <span className="inline-block font-typewriter text-[10px] uppercase tracking-wider px-2 py-0.5 bg-ink/5 text-ink/40 border border-ink/10">No</span>
      );
    }

    return String(value ?? '');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cutout-red"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl text-ink">{title}</h1>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-paper font-typewriter text-xs uppercase tracking-wider border-[3px] border-ink shadow-hard-red hover:shadow-hard-red-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full bg-paper-white border-2 border-ink/20 pl-10 pr-4 py-2.5 font-body text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-cutout-red transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-paper-white border-2 border-ink/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-ink/5 border-b-2 border-ink/10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="px-4 py-3 text-left font-typewriter text-[10px] uppercase tracking-wider text-ink/60"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-typewriter text-[10px] uppercase tracking-wider text-ink/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-8 text-center font-body text-sm text-ink/40"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item._id} className="hover:bg-cutout-yellow/10 transition-colors">
                    {columns.map((col) => (
                      <td
                        key={`${item._id}-${String(col.key)}`}
                        className="px-4 py-3 font-body text-sm text-ink/80"
                      >
                        {col.render ? col.render(item) : getValue(item, String(col.key))}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1.5 text-ink/30 hover:text-ink hover:bg-ink/5 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => item._id && onDelete(item._id)}
                          className="p-1.5 text-ink/30 hover:text-cutout-red hover:bg-cutout-red/5 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t-2 border-ink/10">
            <p className="font-typewriter text-[10px] uppercase tracking-wider text-ink/40">
              Showing {(page - 1) * perPage + 1} to{' '}
              {Math.min(page * perPage, filteredData.length)} of {filteredData.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-1.5 text-ink/40 hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-typewriter text-xs text-ink/60">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="p-1.5 text-ink/40 hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
