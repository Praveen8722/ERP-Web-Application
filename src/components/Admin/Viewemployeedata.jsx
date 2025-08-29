import React, { useState, useEffect } from "react";
import axios from "axios";
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from "material-react-table";
import { Box, Button, MenuItem } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useNavigate } from "react-router-dom";

const columnHelper = createMRTColumnHelper();

const columns = [
    { accessorKey: "fullName", header: "Full Name", size: 40 },
    { accessorKey: "email", header: "Email", size: 40 },
    { accessorKey: "phone", header: "Phone", size: 40 },
    { accessorKey: "employeeRole.roleName", header: "Employee Role", size: 40 },
    { accessorKey: "department.departmentName", header: "Department", size: 40 },
    { accessorKey: "uniqueId", header: "Employee ID", size: 40 },
];

const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    showLabels: true,
    showTitle: false,
    title: "Employee Data",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
});

const ViewEmployeedata = (props) => {
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

    const handleNavigate = (row, path) =>{
        navigate(path, { state: { empid: row.original._id,} });
    };
  

    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
    };

    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: true,
        enableRowActions: true,
        positionActionsColumn: "last",
        renderRowActionMenuItems: ({ row }) => [
            <MenuItem key="edit" onClick={() => handleNavigate(row, "/admins/employeeDetail")}>
                View
            </MenuItem>,
            <MenuItem key="delete" onClick={() => handleDelete(row.original._id)}>
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

export default ViewEmployeedata;
