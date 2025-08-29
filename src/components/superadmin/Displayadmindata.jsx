import React, { useState, useEffect } from "react";
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from "material-react-table";
import { Box, Button, MenuItem } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; // Import your CSV export library here
import { useNavigate } from "react-router-dom";

const columnHelper = createMRTColumnHelper();

const columns = [

  {
    accessorKey: "fullName",
    header: "Full Name",
    size: 40,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 40,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    size: 40,
  },
  {
    accessorKey: "role",
    header: "Role",
    size: 40,
  },
  {
    accessorKey: "organisation.organisationName",
    header: "Organization Name",
    size: 40,
  }
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Displayadmindata = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState(props.data || []);

  useEffect(() => {
    setData(props.data || []);
  }, [props.data]);

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handleNavigate = (row, path) => {
    navigate(path, { state: { clinicid: row.original._id.$oid } });
  };

  const handleDelete = (id) => {
    // Placeholder function for handling deletion
    console.log(`Deleting item with ID: ${id}`);
    // Implement deletion logic here, e.g., update state or make API call
    const updatedData = data.filter((item) => item._id.$oid !== id);
    setData(updatedData);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    options: {
      compression: true,
    },
    enableRowSelection: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem key="edit" onClick={() => handleNavigate(row, "/admins/clinicDetail")}>
        View
      </MenuItem>,
      <MenuItem key="delete" onClick={() => handleDelete(row.original._id.$oid)}>
        Delete
      </MenuItem>,
    ],
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      density: "compact",
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
          Export All Data
        </Button>
        <Button
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Displayadmindata;
