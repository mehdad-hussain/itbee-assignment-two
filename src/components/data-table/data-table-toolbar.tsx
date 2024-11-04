import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { CreateTaskDialog } from "@/features/task/components/create-task-dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { priorities, statuses } from "@/types/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debouncedSearchValue) {
            table.getColumn("name")?.setFilterValue(debouncedSearchValue);
        } else {
            table.getColumn("name")?.setFilterValue(undefined);
        }
    }, [debouncedSearchValue, table]);

    return (
        <div className="flex items-center justify-between max-sm:gap-16">
            <div className="flex flex-col flex-1 gap-2 space-x-2 sm:items-center sm:flex-row">
                <Input
                    placeholder="Search name..."
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="h-8 w-full sm:w-[150px] lg:w-[250px]"
                />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
                )}
                {table.getColumn("priority") && (
                    <DataTableFacetedFilter column={table.getColumn("priority")} title="Priority" options={priorities} />
                )}
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <Cross2Icon className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
            <div className="flex gap-2 ">
                <CreateTaskDialog />
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
