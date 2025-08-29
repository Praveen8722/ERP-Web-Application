import React, { useContext, useState, useEffect } from 'react';
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';
import AdminContext from '../context/AdminContext';

const Empattachement = ({ id }) => {
    const { getTask } = useContext(AdminContext);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTask(id);
                const tasks = response.resultData;
                console.log('Tasks response:', tasks);

                const allAttachments = tasks.flatMap(task => 
                    (task.attachments || []).map(attachment => ({
                        ...attachment,
                        taskName: task.name 
                    }))
                );

                setAttachments(allAttachments);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [id, getTask]);

    console.log('Attachments:', attachments);

    const handleView = (filename) => {
        window.open(`http://localhost:4000/uploads/${filename}`, '_blank');
    };

    const handleDownload = (filename) => {
        const url = `http://localhost:4000/uploads/${filename}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        })
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
    };

    const renderAttachment = (attachment) => {
        const fileExtension = attachment.filename.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return (
                <img
                    src={`http://localhost:4000/uploads/${attachment.filename}`}
                    alt={attachment.originalname}
                    style={{ width: '100px', height: 'auto' }}
                />
            );
        } else if (fileExtension === 'pdf') {
            return (
                <embed
                    src={`http://localhost:4000/uploads/${attachment.filename}`}
                    type="application/pdf"
                    width="100px"
                    height="100px"
                />
            );
        } else if (fileExtension === 'txt') {
            return (
                <iframe
                    src={`http://localhost:4000/uploads/${attachment.filename}`}
                    style={{ width: '100px', height: '100px' }}
                />
            );
        } else {
            return <Typography>Unsupported file type: {attachment.originalname}</Typography>;
        }
    };

    return (
        <div>
            {attachments.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Attachment</TableCell>
                                <TableCell>Filename</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attachments.map((attachment, index) => (
                                <TableRow key={index} sx={{ backgroundColor: index % 2 ? 'action.hover' : 'inherit' }}>
                                    <TableCell>{renderAttachment(attachment)}</TableCell>
                                    <TableCell>{attachment.originalname}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleView(attachment.filename)}
                                            style={{ marginRight: '10px' }}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDownload(attachment.filename)}
                                        >
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No attachments found.</Typography>
            )}
        </div>
    );
};

export default Empattachement;
