import React, { useState } from 'react';
import SuperAdminContext from './SuperAdminContext'; 
import { apiPath } from '../Constents';

const SuperAdminState = (props) => {
  const [islogin, setLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [organisationTypeChanged, setOrganisationTypeChanged]=useState(false)
  const  [activeChanged, setactiveChanged]=useState(false)


  const createAdmin = async (data) => {

    setOrganisationTypeChanged(false);
     try {
       const response = await  fetch(apiPath + "/superAdmin/createAdmin", {  
         method: "POST",
         headers: {
           Accept: "application/json",
           Authorization: `Bearer ${localStorage.getItem("token")}`,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           data: data
         }),
       });
     
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
     
       const responseData =await response.json();
       setOrganisationTypeChanged(true);
      
     
     } catch (error) {
       console.error("Error:", error.message);
     }
     
 };
 const getAdmin = async () => {
  setOrganisationTypeChanged(false);
  try {
    const response = await fetch(apiPath + "/superAdmin/getAdmin", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    setOrganisationTypeChanged(true);
    if (responseData.Success) {
      return responseData; 
      
    } else {
      throw new Error(responseData.Message || "Failed to fetch organisation");
    }
  } catch (error) {
    console.error("Error fetching organisation types:", error.message);
    throw error; 
  }
};

  const createorganisations = async (data) => {

     setOrganisationTypeChanged(false);
      try {
        const response = await  fetch(apiPath + "/superAdmin/organisation/create", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: data,
          }),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const responseData =await response.json();
        setOrganisationTypeChanged(true);
       
      
      } catch (error) {
        console.error("Error:", error.message);
      }
  };

  const getorganisations = async () => {
    setOrganisationTypeChanged(false);
    try {
      const response = await fetch(apiPath + "/superAdmin/getorganisation", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      setOrganisationTypeChanged(true);
      if (responseData.Success) {
        return responseData; 
        
      } else {
        throw new Error(responseData.Message || "Failed to fetch organisation");
      }
    } catch (error) {
      console.error("Error fetching organisation types:", error.message);
      throw error; 
    }
  };


  const createorganisationsType = async (data) => {
    setOrganisationTypeChanged(false);
     try {
       const response = await  fetch(apiPath + "/superAdmin/createservices", {
         method: "POST",
         headers: {
           Accept: "application/json",
           Authorization: `Bearer ${localStorage.getItem("token")}`,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           data: data,
         }),
       });
     
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
     
       const responseData =await response.json();
       setOrganisationTypeChanged(true);
      
     
     } catch (error) {
       console.error("Error:", error.message);
     }  
 };
 const getorganisationsType = async () => {
  setOrganisationTypeChanged(false);
  try {
    const response = await fetch(apiPath + "/superAdmin/getservices", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    setOrganisationTypeChanged(true);
    if (responseData.Success) {
      return responseData.resultData; 
      
    } else {
      throw new Error(responseData.Message || "Failed to fetch organisation types");
    }
  } catch (error) {
    console.error("Error fetching organisation types:", error.message);
    throw error; 
  }
};
const updateOrganisationType = async (currentId, data) => {
  setOrganisationTypeChanged(false);
  try {
    const response = await fetch(`${apiPath}/superAdmin/updateService`, {
      method: "POST", 
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentId,
        servicesType: data.typeName
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    setOrganisationTypeChanged(true);
    if (responseData.Success) {
      return responseData.resultData; 
    } else {
      throw new Error(responseData.Message || "Failed to update organisation type");
    }
  } catch (error) {
    console.error("Error updating organisation type:", error.message);
    throw error; 
  }
};
const adminactivestatus  = async (currentId,status) => {
  setactiveChanged(false);
   try {
     const response = await  fetch(apiPath + "/superAdmin/adminactivestatus", {
       method: "POST",
       headers: {
         Accept: "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         currentId:currentId,
         status:status
       }),
     });
   
     if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }
   
     const responseData =await response.json();
     setactiveChanged(true);
    
   
   } catch (error) {
     console.error("Error:", error.message);
   }  
 
};

const orgactivestatus  = async (statusorganisationId, currentStatus) => {
  setactiveChanged(false);
   try {
     const response = await  fetch(apiPath + "/superAdmin/orgactivestatus", {
       method: "POST",
       headers: {
         Accept: "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         currentId:statusorganisationId,
         status:currentStatus
       }),
     });
   
     if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }
   
     const responseData =await response.json();
     setactiveChanged(true);
    
   
   } catch (error) {
     console.error("Error:", error.message);
   }  
 
};

const logout = async () => {
  localStorage.removeItem("token");
  setLogin(false);
};


  return (
    <SuperAdminContext.Provider value={{islogin,logout,setLogin,createAdmin,getAdmin ,createorganisations,getorganisations,createorganisationsType,getorganisationsType ,updateOrganisationType,organisationTypeChanged,
    adminactivestatus,orgactivestatus,activeChanged}}>
      {props.children}
    </SuperAdminContext.Provider>
  )
}

export default SuperAdminState;
