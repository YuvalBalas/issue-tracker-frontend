import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import type { SearchFilter, SelectFilter } from "./data-table-types";
import type { ReactNode } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchFilter: SearchFilter;
  selectFilters: SelectFilter[];
  actions: ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  searchFilter,
  selectFilters,
  actions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder={searchFilter.placeholder}
          value={
            (table
              .getColumn(searchFilter.column)
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(searchFilter.column)
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {selectFilters.map(
          (filter) =>
            table.getColumn(filter.column) && (
              <DataTableFacetedFilter
                key={filter.column}
                column={table.getColumn(filter.column)}
                title={filter.title}
                options={filter.options}
              />
            )
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        {actions}
      </div>
    </div>
  );
}
