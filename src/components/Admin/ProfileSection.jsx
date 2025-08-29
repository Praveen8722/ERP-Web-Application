import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import {
  Paper,
  Box,
  Typography,
  Tabs,
  Tab,
  Avatar,
  IconButton,
  Grid,
  Divider,
  useMediaQuery,
  AppBar,
} from "@mui/material";

import {
  MailOutline as MailOutlineIcon,
  CheckCircleOutline,
} from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import BusinessIcon from "@mui/icons-material/Business";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WorkHistory from "./WorkHistory";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import { TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// import universityCampus from "../public/img/university-campus.svg";

const ProfileSection = ({ children }) => {
  const [value, setValue] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [editMode, setEditMode] = useState(false);

  // State for each section
  const [personalInfo, setPersonalInfo] = useState({
    name: "Praveen Reddy",
    dob: "26/03/1994",
    gender: "Male",
    bloodGroup: "B +",
    maritalStatus: "Single",
  });

  const [contactInfo, setContactInfo] = useState({
    officialEmail: "praveen@.com",
    personalEmail: "praveen2654@gmail.com",
    phoneNumber: "8981172540",
    alternatePhoneNumber: "B7003297286",
  });

  const [education, setEducation] = useState({
    highestDegree: "B.Tech",
    university: "JNTU Hyderabad",
    yearOfPassing: "2016",
  });

  const [accountInfo, setAccountInfo] = useState({
    holderName: "Praveen Reddy",
    bankName: "State Bank of India",
    accountNumber: "898117254011",
    ifscCode: "SBI123456789",
  });

  const [educationInfo, setEducationInfo] = useState([
    {
      id: 1,
      type: "Graduation",
      institution: "Vinayaka Mission",
      details: "BCA Computer Science Correspondence 2013 - 2016 Vinayaka Mission University",
    },
    {
      id: 2,
      type: "Pre University",
      institution: "Ashok Hall Higher Secondary School",
      details: "+2 Commerce Full Time 2011 - 2013 Ashok Hall",
    },
    {
      id: 3,
      type: "Post Graduation",
      institution: "Vinayaka Mission",
      details: "BCA Computer Science Correspondence 2013 - 2016 Vinayaka Mission University",
    },
  ]);

  const [documents, setDocuments] = useState([
    { type: "PAN Card", id: "FIMPS7509R", uploadedBy: "Praveen Reddy", verification: "Verified", isEditing: false },
    { type: "Driving Licence", id: "WB-0120130968200", uploadedBy: "Praveen Reddy", verification: "Verified", isEditing: false },
    { type: "Aadhaar Card", id: "463169716243", uploadedBy: "Praveen Reddy", verification: "Verified", isEditing: false }
  ]);



  const EditableField = ({ value, name, onChange, isEditing }) => (
    isEditing ? (
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
      />
    ) : (
      value
    )
  );

  const ButtonGroup = ({ id, onEditToggle, onSaveDocument, onDeleteDocument, isEditing }) => (
    isEditing ? (
      <>
        <IconButton size="small" onClick={() => onSaveDocument(id)}><SaveIcon /></IconButton>
        <IconButton size="small" onClick={() => onEditToggle(id)}><CancelIcon /></IconButton>
      </>
    ) : (
      <>
        <IconButton size="small"><DescriptionIcon /></IconButton>
        <IconButton size="small"><CloudUploadIcon /></IconButton>
        <IconButton size="small" onClick={() => onEditToggle(id)}><EditIcon /></IconButton>
        <IconButton size="small" onClick={() => onDeleteDocument(id)}><DeleteIcon /></IconButton>
      </>
    )
  );


  const handleChange = (event, newValue) => {
    if (newValue !== undefined) {
      setValue(newValue);
    } else {
      const { name, value } = event.target;
      if (name in personalInfo) {
        setPersonalInfo((prev) => ({ ...prev, [name]: value }));
      } else if (name in contactInfo) {
        setContactInfo((prev) => ({ ...prev, [name]: value }));
      } else if (name in education) {
        setEducation((prev) => ({ ...prev, [name]: value }));
      } else if (name in accountInfo) {
        setAccountInfo((prev) => ({ ...prev, [name]: value }));
      }
    }
  };


  const handleToggleEdit = () => {
    setEditMode((prev) => !prev);
  };

  const renderInfoField = (label, name, value, stateSetter, state) => (
    <Grid item xs={12} sm={4}>
      <Typography variant="body1">
        <strong>{label}</strong>
      </Typography>
      {editMode ? (
        <TextField
          fullWidth
          name={name}
          value={value}
          onChange={handleChange}
          size="small"
        />
      ) : (
        <Typography variant="body2">{value}</Typography>
      )}
    </Grid>
  );

  const handleEditToggle = (id) => {
    setEducationInfo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const handleDelete = (id) => {
    setEducationInfo((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFieldChange = (id, event) => {
    const { name, value } = event.target;
    setEducationInfo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };


  const handleAdd = () => {
    const newId = educationInfo.length + 1;
    setEducationInfo((prev) => [
      ...prev,
      {
        id: newId,
        type: "",
        institution: "",
        details: "",
        isEditing: true,
      },
    ]);
  };


  const [newDoc, setNewDoc] = useState({ type: "", id: "", uploadedBy: "", verification: "Verified" });
  const [addingMode, setAddingMode] = useState(false);

  const toggleEditMode = (id) => {
    setDocuments(docs => docs.map(doc => doc.id === id ? { ...doc, isEditing: !doc.isEditing } : doc));
  };

  const handleFieldUpdate = (id, event) => {
    const { name, value } = event.target;
    setDocuments(docs => docs.map(doc => doc.id === id ? { ...doc, [name]: value } : doc));
  };

  const handleNewDocumentUpdate = (event) => {
    const { name, value } = event.target;
    setNewDoc(prev => ({ ...prev, [name]: value }));
  };

  const saveDocumentChanges = (id) => {
    setDocuments(docs => docs.map(doc => doc.id === id ? { ...doc, isEditing: false } : doc));
  };

  const addNewDocument = () => {
    if (newDoc.type && newDoc.id && newDoc.uploadedBy) {
      setDocuments(docs => [...docs, { ...newDoc, isEditing: false }]);
      setNewDoc({ type: "", id: "", uploadedBy: "", verification: "Verified" });
      setAddingMode(false);
    }
  };

  const cancelNewDocument = () => {
    setNewDoc({ type: "", id: "", uploadedBy: "", verification: "Verified" });
    setAddingMode(false);
  };

  const removeDocument = (id) => {
    setDocuments(docs => docs.filter(doc => doc.id !== id));
  };


  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            top: "70px",
            zIndex: 2000,
            width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
            left: collapsed ? "100px" : "270px",
            paddingLeft: "30px ",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10rem",
            }}
          >
            <Typography
              color="#abafdb"
              fontFamily="revert"
              fontSize="22px"
              fontWeight="550"
            >
              Profile Section
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Profile section tabs"
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": {
                  fontWeight: 600,
                  color: "#2596be",
                  marginRight: "1rem",
                  mt: { xs: "0", md: "2rem" },
                },
              }}
            >
              <Tab label="Personal" />
              <Tab label="Work" />
            </Tabs>
          </Box>
        </Paper>

        <main
          style={{
            padding: "20px",
            width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
            marginLeft: collapsed ? "100px" : "270px",
            marginTop: "80px",
            flexGrow: 1,
            background: "white",
          }}
        >
          {value === 0 && (
            <div>
              {children}
              <Box sx={{ flexGrow: 1 }}>
                <AppBar
                  position="sticky"
                  color="default"
                  sx={{
                    maxWidth: { xs: "100%", md: "63%" },
                    ml: { xs: "0", md: "19rem" },
                    mt: { xs: "0", md: "10rem" },
                  }}
                ></AppBar>

                <Box
                  sx={{
                    position: { xs: "static", md: "sticky" },
                    top: { md: "11rem" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 1,
                    maxWidth: 250,
                    maxHeight: "20rem",
                    borderRadius: 1,
                    boxShadow: 10,
                    mt: { xs: "1rem", md: "-5.3rem" },
                    overflow: "hidden",
                    ml: { xs: "3rem", md: "1rem" },
                  }}
                >
                  <Avatar
                    alt="Praveen"
                    src="path-to-image"
                    sx={{ width: 100, height: 100, mb: 1 }}
                  />
                  <Box sx={{ textAlign: "center", mb: 1 }}>
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={{ fontWeight: "600", color: "#2596be" }}
                    >
                      Praveen Reddy
                    </Typography>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ fontWeight: "600", color: "grey" }}
                    >
                      Management
                    </Typography>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ fontWeight: "600", color: "grey" }}
                    >
                      Chief Executive Officer
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BusinessIcon sx={{ color: "blue", mr: 1 }} />
                      <Typography
                        variant="body1"
                        noWrap
                        sx={{ fontWeight: "600", color: "grey" }}
                      >
                        Corporate Office
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton color="primary">
                        <MailOutlineIcon />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ ml: 1, fontWeight: "600", color: "grey" }}
                        noWrap
                      >
                        praveen@erp...
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        color="primary"
                        href="https://linkedin.com"
                        target="_blank"
                      >
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        href="https://facebook.com"
                        target="_blank"
                      >
                        <FacebookIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>

                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    width: "60%",
                    ml: { xs: "3rem", md: "20rem" },
                    mt: { xs: "0rem", md: "-18.9rem" },
                    boxShadow: 10,
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      gutterBottom
                      sx={{ fontWeight: "600", color: "#2596be" }}
                    >
                      PERSONAL INFO
                    </Typography>
                    <IconButton onClick={handleToggleEdit}>
                      {editMode ? (
                        <SaveIcon color="primary" />
                      ) : (
                        <EditIcon color="action" />
                      )}
                    </IconButton>
                  </Grid>
                  <Divider sx={{ marginY: 2 }} />
                  <Grid container spacing={4}>
                    {renderInfoField(
                      "Name",
                      "name",
                      personalInfo.name,
                      setPersonalInfo,
                      personalInfo
                    )}
                    {renderInfoField(
                      "Date of Birth",
                      "dob",
                      personalInfo.dob,
                      setPersonalInfo,
                      personalInfo
                    )}
                    {renderInfoField(
                      "Gender",
                      "gender",
                      personalInfo.gender,
                      setPersonalInfo,
                      personalInfo
                    )}
                    {renderInfoField(
                      "Blood Group",
                      "bloodGroup",
                      personalInfo.bloodGroup,
                      setPersonalInfo,
                      personalInfo
                    )}
                    {renderInfoField(
                      "Marital Status",
                      "maritalStatus",
                      personalInfo.maritalStatus,
                      setPersonalInfo,
                      personalInfo
                    )}
                  </Grid>
                </Paper>

                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    width: "60%",
                    ml: { xs: "3rem", md: "20rem" },
                    mt: { xs: "2rem", md: "2rem" },
                    boxShadow: 10,
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      gutterBottom
                      sx={{ fontWeight: "600", color: "#2596be" }}
                    >
                      CONTACT INFO
                    </Typography>
                    <IconButton onClick={handleToggleEdit}>
                      {editMode ? (
                        <SaveIcon color="primary" />
                      ) : (
                        <EditIcon color="action" />
                      )}
                    </IconButton>
                  </Grid>
                  <Divider sx={{ marginY: 2 }} />
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Official Email ID</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="officialEmail"
                          value={contactInfo.officialEmail}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {contactInfo.officialEmail}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Personal Email ID</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="personalEmail"
                          value={contactInfo.personalEmail}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {contactInfo.personalEmail}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="body1"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                      >
                        <strong>Phone Number</strong>
                        <CheckCircleOutlineIcon
                          sx={{ color: "green", fontSize: 20, ml: 1 }}
                        />
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="phoneNumber"
                          value={contactInfo.phoneNumber}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {contactInfo.phoneNumber}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Alternate Phone Number</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="alternatePhoneNumber"
                          value={contactInfo.alternatePhoneNumber}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {contactInfo.alternatePhoneNumber}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Paper>

                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    width: "60%",
                    ml: { xs: "3rem", md: "20rem" },
                    mt: { xs: "2rem", md: "2rem" },
                    boxShadow: 10,
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      gutterBottom
                      sx={{ fontWeight: "600", color: "#2596be" }}
                    >
                      EDUCATIONAL INFO
                    </Typography>
                    <IconButton onClick={handleToggleEdit}>
                      {editMode ? (
                        <SaveIcon color="primary" />
                      ) : (
                        <EditIcon color="action" />
                      )}
                    </IconButton>
                  </Grid>
                  <Divider sx={{ marginY: 2 }} />
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1">
                        <strong>Highest Degree</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="highestDegree"
                          value={education.highestDegree}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {education.highestDegree}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1">
                        <strong>University</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="university"
                          value={education.university}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {education.university}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1">
                        <strong>Year of Passing</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="yearOfPassing"
                          value={education.yearOfPassing}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {education.yearOfPassing}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Paper>

                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    width: "60%",
                    ml: { xs: "3rem", md: "20rem" },
                    mt: { xs: "2rem", md: "2rem" },
                    boxShadow: 10,
                  }}
                >
                  <Typography gutterBottom sx={{ fontWeight: "600", color: "#2596be" }}>
                    EDUCATIONAL INFO
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />
                  {educationInfo.map((edu) => (
                    <Grid container key={edu.id}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        display={"flex"}
                        justifyContent={"space-between"}
                        mt={2}
                      >
                        {edu.isEditing ? (
                          <TextField
                            variant="outlined"
                            name="type"
                            value={edu.type}
                            onChange={(event) => handleFieldChange(edu.id, event)}
                          />
                        ) : (
                          <Typography variant="body1">
                            <strong>{edu.type}</strong>
                          </Typography>
                        )}
                        <Grid color={"grey"}>
                          <IconButton onClick={() => handleEditToggle(edu.id)}>
                            {edu.isEditing ? <SaveIcon /> : <EditIcon />}
                          </IconButton>
                          <IconButton onClick={() => handleDelete(edu.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={2.3}>
                        <Typography
                          variant="body1"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#ECF6FF",
                            width: "15vh",
                            height: "14vh",
                            textAlign: "center",
                          }}
                        >
                          {/* Optional Image Placeholder */}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3.5}>
                        {edu.isEditing ? (
                          <>
                            <TextField
                              variant="outlined"
                              name="institution"
                              value={edu.institution}
                              onChange={(event) => handleFieldChange(edu.id, event)}
                              fullWidth
                              sx={{ mb: 1 }}
                            />
                            <TextField
                              variant="outlined"
                              name="details"
                              value={edu.details}
                              onChange={(event) => handleFieldChange(edu.id, event)}
                              fullWidth
                              multiline
                              rows={2}
                            />
                          </>
                        ) : (
                          <>
                            <Typography variant="body1">
                              <strong>{edu.institution}</strong>
                            </Typography>
                            <Typography variant="body2">{edu.details}</Typography>
                          </>
                        )}
                      </Grid>
                      <Divider sx={{ marginY: 2 }} />
                    </Grid>
                  ))}
                  <Grid container spacing={4}>
                    <Grid item>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{ color: "#2596be", cursor: "pointer" }}
                        onClick={handleAdd}
                      >
                        <AddCircleIcon />
                        <Typography variant="body1">
                          <strong>Add</strong>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper elevation={3} sx={{ padding: 2, width: "60%", ml: { xs: "3rem", md: "20rem" }, mt: { xs: "2rem", md: "2rem" }, boxShadow: 10 }}>
                  <Grid item xs={12} sm={12} display={"flex"} justifyContent={"space-between"}>
                    <Typography gutterBottom sx={{ fontWeight: "600", color: "#2596be" }}>UPLOADED DOCUMENTS</Typography>
                  </Grid>
                  <Divider sx={{ marginY: 2 }} />
                  <Box sx={{ width: "105%" }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>TYPE</strong></TableCell>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>UPLOADED BY</strong></TableCell>
                            <TableCell><strong>VERIFICATION</strong></TableCell>
                            <TableCell><strong>ACTIONS</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {documents.map(doc => (
                            <TableRow key={doc.id}>
                              <TableCell><EditableField name="type" value={doc.type} onChange={(e) => handleFieldUpdate(doc.id, e)} isEditing={doc.isEditing} /></TableCell>
                              <TableCell><EditableField name="id" value={doc.id} onChange={(e) => handleFieldUpdate(doc.id, e)} isEditing={doc.isEditing} /></TableCell>
                              <TableCell><EditableField name="uploadedBy" value={doc.uploadedBy} onChange={(e) => handleFieldUpdate(doc.id, e)} isEditing={doc.isEditing} /></TableCell>
                              <TableCell>
                                {doc.isEditing ? (
                                  <TextField name="verification" value={doc.verification} onChange={(e) => handleFieldUpdate(doc.id, e)} fullWidth />
                                ) : (
                                  <Typography sx={{ display: "flex", alignItems: "center" }} color="success.main">
                                    <VerifiedIcon sx={{ marginRight: 1 }} />{doc.verification}
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                <ButtonGroup id={doc.id} onEditToggle={toggleEditMode} onSaveDocument={saveDocumentChanges} onDeleteDocument={removeDocument} isEditing={doc.isEditing} />
                              </TableCell>
                            </TableRow>
                          ))}
                          {addingMode && (
                            <TableRow>
                              <TableCell><TextField label="Type" name="type" variant="outlined" fullWidth value={newDoc.type} onChange={handleNewDocumentUpdate} /></TableCell>
                              <TableCell><TextField label="ID" name="id" variant="outlined" fullWidth value={newDoc.id} onChange={handleNewDocumentUpdate} /></TableCell>
                              <TableCell><TextField label="Uploaded By" name="uploadedBy" variant="outlined" fullWidth value={newDoc.uploadedBy} onChange={handleNewDocumentUpdate} /></TableCell>
                              <TableCell><TextField label="Verification" name="verification" variant="outlined" fullWidth value={newDoc.verification} onChange={handleNewDocumentUpdate} /></TableCell>
                              <TableCell>
                                <IconButton size="small" onClick={addNewDocument}><SaveIcon /></IconButton>
                                <IconButton size="small" onClick={cancelNewDocument}><CancelIcon /></IconButton>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                      {!addingMode && (
                        <Button startIcon={<AddCircleOutlineIcon />} sx={{ marginTop: 2 }} color="primary" onClick={() => setAddingMode(true)}>ADD NEW DOCUMENT</Button>
                      )}
                    </TableContainer>
                  </Box>
                </Paper>

                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    width: "60%",
                    ml: { xs: "3rem", md: "20rem" },
                    mt: { xs: "2rem", md: "2rem" },
                    boxShadow: 10,
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      gutterBottom
                      sx={{ fontWeight: "600", color: "#2596be" }}
                    >
                      ACCOUNT INFO
                    </Typography>
                    <IconButton onClick={handleToggleEdit}>
                      {editMode ? (
                        <SaveIcon color="primary" />
                      ) : (
                        <EditIcon color="action" />
                      )}
                    </IconButton>
                  </Grid>
                  <Divider sx={{ marginY: 2 }} />
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Account Holder Name</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="holderName"
                          value={accountInfo.holderName}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {accountInfo.holderName}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Bank Name</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="bankName"
                          value={accountInfo.bankName}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {accountInfo.bankName}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Account Number</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="accountNumber"
                          value={accountInfo.accountNumber}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {accountInfo.accountNumber}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>IFSC Code</strong>
                      </Typography>
                      {editMode ? (
                        <TextField
                          fullWidth
                          name="ifscCode"
                          value={accountInfo.ifscCode}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {accountInfo.ifscCode}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Paper>

                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    width: "60%",
                    ml: { xs: "3rem", md: "20rem" },
                    mt: { xs: "2rem", md: "2rem" },
                    boxShadow: 10,
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      gutterBottom
                      sx={{ fontWeight: "600", color: "#2596be" }}
                    >
                      SOCIAL PROFILE
                    </Typography>

                  </Grid>
                  <Divider sx={{ marginY: 2 }} />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      color="primary"
                      href="https://linkedin.com"
                      target="_blank"
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href="https://facebook.com"
                      target="_blank"
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href="https://XIcon.com"
                      target="_blank"
                    >
                      <XIcon />
                    </IconButton>
                  </Box>
                </Paper>

                {value === 1 && <WorkHistory />}
              </Box>
            </div>
          )}
          {value === 1 && <WorkHistory />}
        </main>
      </div>
    </div>
  );
};

export default ProfileSection;
