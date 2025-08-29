import React from 'react'
import { apiPath } from '../Constents';
import EmpContext from './EmpContext'

const EmpState = (props) => {

    const getProject = async (data) => {
        
         try {
           const response = await  fetch(apiPath + "/emp/getproject", {
             method: "GET",
             headers: {
               Accept: "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
               "Content-Type": "application/json",
             },
           });
         
           if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
           }
         
           const responseData =await response.json();
      
         
           if(responseData.Success)
           {
            return responseData;
           }
         
         } catch (error) {
           console.error("Error:", error.message);
         }
      };

      const getTask = async (id) => {
     
         try {
           const response = await  fetch(apiPath + "/emp/gettask", {
             method: "POST",
             headers: {
               Accept: "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
              id:id
            }),
           });
         
           if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
           }
         
           const responseData =await response.json();
          
         
           if(responseData.Success)
           {
            return responseData;
           }
         
         } catch (error) {
           console.error("Error:", error.message);
         }
      };
      const  markAttendance= async (attendanceData) => {
     
        try {
          const response = await  fetch(apiPath + "/emp/markattendance", {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              attendanceData:attendanceData
           }),
          });
        
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        
          const responseData =await response.json();
         
        
          if(responseData.Success)
          {
           return responseData;
          }
        
        } catch (error) {
          console.error("Error:", error.message);
        }
     };
     const  applyLeave= async (leaveData) => {
     
      try {
        const response = await  fetch(apiPath + "/emp/applyleave", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leaveData:leaveData
         }),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData =await response.json();
       
      
        if(responseData.Success)
        {
         return responseData;
        }
      
      } catch (error) {
        console.error("Error:", error.message);
      }
   };
   const  getLeave= async () => {
     
    try {
      const response = await  fetch(apiPath + "/emp/getleave", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const responseData =await response.json();
     
    
      if(responseData.Success)
      {
       return responseData;
      }
    
    } catch (error) {
      console.error("Error:", error.message);
    }
 };

 const  getLeaveBalances= async () => {
     
  try {
    const response = await  fetch(apiPath + "/emp/leave-balances", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const responseData =await response.json();
   
  
    if(responseData.Success)
    {
     return responseData;
    }
  
  } catch (error) {
    console.error("Error:", error.message);
  }
};
  return (
     <EmpContext.Provider value={{getProject,getTask, markAttendance,applyLeave,getLeave,getLeaveBalances}}>
         {props.children}
     </EmpContext.Provider>
  )
}

export default EmpState;
