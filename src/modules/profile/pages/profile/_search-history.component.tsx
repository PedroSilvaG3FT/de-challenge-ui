import {
  DataTable,
  AppColumnDef,
  DataTableHeader,
} from "@/design/components/ui/datatable";
import { useEffect, useState } from "react";
import loadingStore from "@/store/loading.store";
import { ResponseUtil } from "@/modules/@shared/util/response.util";
import { FlightService } from "@/modules/shopping/services/flight.service";
import { IFlightSearchHistory } from "@/modules/shopping/interface/flight-search-history.interface";

export default function SearchHistoryComponent() {
  const _loadingStore = loadingStore((state) => state);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [historyList, setHistoryList] = useState<IFlightSearchHistory[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const getHistory = () => {
    _loadingStore.setShow(true);

    FlightService.getSearchHistory()
      .then(({ data: response }) => {
        setHistoryList(response.data);
        setTotalItems(response.data.length);
        _loadingStore.setShow(false);
      })
      .catch((error) => {
        ResponseUtil.handleError(error);
        _loadingStore.setShow(false);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  const startIndex = pagination.pageIndex * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedHistoryList = historyList.slice(startIndex, endIndex);

  const columns: AppColumnDef<IFlightSearchHistory>[] = [
    {
      accessorKey: "origin",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Origin" />
      ),
      cell: ({ row }) => row.original.origin,
    },
    {
      accessorKey: "destination",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Destination" />
      ),
      cell: ({ row }) => row.original.destination,
    },
    {
      accessorKey: "originDate",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Origin Date" />
      ),
      cell: ({ row }) => new Date(row.original.originDate).toLocaleDateString(),
    },
    {
      accessorKey: "destinationDate",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Destination Date" />
      ),
      cell: ({ row }) =>
        row.original.destinationDate
          ? new Date(row.original.destinationDate).toLocaleDateString()
          : "N/A",
    },
    {
      accessorKey: "countPassengers",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Passengers" />
      ),
      cell: ({ row }) => row.original.countPassengers,
    },
    {
      accessorKey: "lowestPrice",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Lowest Price" />
      ),
      cell: ({ row }) =>
        `${parseFloat(String(row.original.lowestPrice)).toFixed(2)}`,
    },
    {
      accessorKey: "higherPrice",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Highest Price" />
      ),
      cell: ({ row }) =>
        `${parseFloat(String(row.original.higherPrice)).toFixed(2)}`,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Search Date" />
      ),
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
    },
  ];

  return (
    <section>
      <h3 className="mb-5">Flight Search History</h3>

      <DataTable
        columns={columns}
        totalItems={totalItems}
        pagination={pagination}
        data={paginatedHistoryList}
        onPaginationChange={setPagination}
      />
    </section>
  );
}
