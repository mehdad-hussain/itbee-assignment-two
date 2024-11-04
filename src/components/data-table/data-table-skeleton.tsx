import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    columnCount: number;
    rowCount?: number;
    searchableColumnCount?: number;
    filterableColumnCount?: number;
    showViewOptions?: boolean;
    cellWidths?: string[];
    withPagination?: boolean;
    shrinkZero?: boolean;
}

export function DataTableSkeleton(props: DataTableSkeletonProps) {
    const {
        columnCount,
        rowCount = 10,
        searchableColumnCount = 0,
        filterableColumnCount = 0,
        showViewOptions = true,
        cellWidths = ["auto"],
        withPagination = true,
        shrinkZero = false,
        className,
        ...skeletonProps
    } = props;

    return (
        <div className={cn("w-full space-y-2.5 overflow-auto", className)} {...skeletonProps}>
            <div className="flex items-center justify-between w-full p-1 space-x-2 overflow-auto">
                <div className="flex items-center flex-1 space-x-2">
                    {searchableColumnCount > 0
                        ? Array.from({ length: searchableColumnCount }).map((_, i) => <Skeleton key={i} className="w-40 h-7 lg:w-60" />)
                        : null}
                    {filterableColumnCount > 0
                        ? Array.from({ length: filterableColumnCount }).map((_, i) => (
                              <Skeleton key={i} className="h-7 w-[4.5rem] border-dashed" />
                          ))
                        : null}
                </div>
                {showViewOptions ? <Skeleton className="ml-auto hidden h-7 w-[4.5rem] lg:flex" /> : null}
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        {Array.from({ length: 1 }).map((_, i) => (
                            <TableRow key={i} className="hover:bg-transparent">
                                {Array.from({ length: columnCount }).map((_, j) => (
                                    <TableHead
                                        key={j}
                                        style={{
                                            width: cellWidths[j],
                                            minWidth: shrinkZero ? cellWidths[j] : "auto",
                                        }}
                                    >
                                        <Skeleton className="w-full h-6" />
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: rowCount }).map((_, i) => (
                            <TableRow key={i} className="hover:bg-transparent">
                                {Array.from({ length: columnCount }).map((_, j) => (
                                    <TableCell
                                        key={j}
                                        style={{
                                            width: cellWidths[j],
                                            minWidth: shrinkZero ? cellWidths[j] : "auto",
                                        }}
                                    >
                                        <Skeleton className="w-full h-6" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {withPagination ? (
                <div className="flex items-center justify-between w-full gap-4 p-1 overflow-auto sm:gap-8">
                    <Skeleton className="w-40 h-7 shrink-0" />
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="w-24 h-7" />
                            <Skeleton className="h-7 w-[4.5rem]" />
                        </div>
                        <div className="flex items-center justify-center text-sm font-medium">
                            <Skeleton className="w-20 h-7" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="hidden size-7 lg:block" />
                            <Skeleton className="size-7" />
                            <Skeleton className="size-7" />
                            <Skeleton className="hidden size-7 lg:block" />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
