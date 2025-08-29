import React, { useState } from 'react';
import { apiPath } from '../Constents';
import AdminContext from './AdminContext';

const AdminState = (props) => {
 
      const [departmentChanged, setDepartmentChanged]=useState(false);
      const [roleChanged,setRoleChanged]=useState(false);
      const  [activeChanged, setactiveChanged]=useState(false)
     

      const createDepartmentType = async (data) => {
        setDepartmentChanged(false);
       
         try {
           const response = await  fetch(apiPath + "/admin/createDepartmentType", {
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
           setDepartmentChanged(true);
         
         } catch (error) {
           console.error("Error:", error.message);
         }  
      
     };

     const getDepartmentTypes = async () => {
        setDepartmentChanged(false);
        try {
          const response = await fetch(apiPath + "/admin/getDepartmentType", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
      
          const responseData = await response.json();
          setDepartmentChanged(true);
          if (responseData.Success) {
            return responseData; 
            
          } else {
            throw new Error(responseData.Message || "Failed to fetch organisation types");
          }
        } catch (error) {
          console.error("Error fetching organisation types:", error.message);
          throw error; 
        }
      };
      const updateDepartmentType = async (currentId, data) => {
        
        setDepartmentChanged(false);
   
        try {
          const response = await fetch(`${apiPath}/admin/updateDepartmentType`, {
            method: "POST", 
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: currentId,
              departmentName: data.typeName
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const responseData = await response.json();
          setDepartmentChanged(true);
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
      
      const Createdepartment = async (data) => {
    
       
        setDepartmentChanged(false);
         try {
           const response = await  fetch(apiPath + "/admin/createDepartment", {
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
           setDepartmentChanged(true);
         
         
         } catch (error) {
           console.error("Error:", error.message);
         }
         
     };

     const getDepartments = async () => {
        try {
          const response = await fetch(apiPath + "/admin/getDepartment", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          const responseData = await response.json();
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
    
      const  createRole = async (data) => {
        setRoleChanged(false);
       
         try {
           const response = await  fetch(apiPath + "/admin/createRole ", {
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
           setRoleChanged(true);
         
         
         } catch (error) {
           console.error("Error:", error.message);
         }  
      
     };
     const getRoles = async () => {
      setRoleChanged(false);
      try {
        const response = await fetch(apiPath + "/admin/getRoles", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
    
        const responseData = await response.json();
        setRoleChanged(true);
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
    const updateRole = async (currentId, data) => {
      
      setRoleChanged(false);
      
      try {
        const response = await fetch(`${apiPath}/admin/updateRole`, {
          method: "POST", 
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentId,
            role: data.roleName
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const responseData = await response.json();
        setRoleChanged(true);
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
    const createEmployee = async (data) => {
    
     
      setDepartmentChanged(false);
       try {
         const response = await  fetch(apiPath + "/admin/createEmployee", {
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
         setDepartmentChanged(true);
       
       
       } catch (error) {
         console.error("Error:", error.message);
       }
       
      
   
     
   };
   const getEmployee = async () => {
    try {
      const response = await fetch(apiPath + "/admin/getEmployees", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  
      const responseData = await response.json();
      if (responseData.Success) {
        return responseData; 
        
      } else {
        throw new Error(responseData.Message || "Failed to fetch organisation types");
      }
    } catch (error) {
      console.error("Error fetching organisation types:", error.message);
      throw error; 
    }
  };

  const getEmployeebyid = async (empid) => {
    setDepartmentChanged(false);
    try {
      const response = await fetch(apiPath + "/admin/getEmployeesbyid", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
          id: empid
        }),
      });
  
      const responseData = await response.json();
      setDepartmentChanged(true);
      if (responseData.Success) {
        return responseData; 
        
      } else {
        throw new Error(responseData.Message || "Failed to fetch organisation types");
      }
    } catch (error) {
      console.error("Error fetching organisation types:", error.message);
      throw error; 
    }
  };

  const updateactivestatus  = async (currentId,status) => {
    setactiveChanged(false);
   
     try {
       const response = await  fetch(apiPath + "/admin/updateactivestatus", {
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
 
 const createStatus = async (data) => {
  setDepartmentChanged(false);
   try {
     const response = await  fetch(apiPath + "/admin/createstatus", {
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
     setDepartmentChanged(true);
   
   
   } catch (error) {
     console.error("Error:", error.message);
   }
   
};

const getStatus = async (data) => {
  setDepartmentChanged(false);
   try {
     const response = await  fetch(apiPath + "/admin/getstatus", {
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
     setDepartmentChanged(true);
   
     if(responseData.Success)
     {
      return responseData;
     }
   
   } catch (error) {
     console.error("Error:", error.message);
   }
  
};

const createProject=async (data)=>{
 
  setDepartmentChanged(false);
   try {
     const response = await  fetch(apiPath + "/admin/createproject", {
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
     setDepartmentChanged(true);
   
   
   } catch (error) {
     console.error("Error:", error.message);
   }
}
const getProject = async (data) => {
  setDepartmentChanged(false);
   try {
     const response = await  fetch(apiPath + "/admin/getproject", {
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
     setDepartmentChanged(true);
   
     if(responseData.Success)
     {
      return responseData;
     }
   
   } catch (error) {
     console.error("Error:", error.message);
   }
};
const getProjectbyid = async (id) => {
  setDepartmentChanged(false);
   try {
     const response = await  fetch(apiPath + "/admin/getprojectbyid", {
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
     setDepartmentChanged(true);
   
     if(responseData.Success)
     {
      return responseData;
     }
   
   } catch (error) {
     console.error("Error:", error.message);
   }
};

const createTask = async (newTask) => {
  setDepartmentChanged(false);
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      title: newTask.title,
      projectId: newTask.projectId,
      priority: newTask.priority,
      assignees: newTask.assignees,
      dueDate: newTask.dueDate,
      estimateTimeHours: newTask.estimateTimeHours,
      estimateTimeDays: newTask.estimateTimeDays,
      description: newTask.description
    }));

    newTask.attachments.forEach(file => {
      formData.append('attachments', file);
    });

    const response = await fetch(apiPath + "/admin/assignedtask", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    setDepartmentChanged(true);
  

  } catch (error) {
    console.error("Error:", error.message);
  }
}
const getTask = async (id) => {
  setDepartmentChanged(false);
   try {
     const response = await  fetch(apiPath + "/admin/gettask", {
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
     setDepartmentChanged(true);
   
     if(responseData.Success)
     {
      return responseData;
     }
   
   } catch (error) {
     console.error("Error:", error.message);
   }
};
const createLeaveType = async (data) => {
  setDepartmentChanged(false);
  try {
    

    const response = await fetch(apiPath + "/admin/createleavetype", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    setDepartmentChanged(true);
  

  } catch (error) {
    console.error("Error:", error.message);
  }
}
const getLeaveTypes = async (id) => {
  setDepartmentChanged(false);
   try {
     const response = await  fetch(apiPath + "/admin/getleavetype", {
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
     setDepartmentChanged(true);
   
     if(responseData.Success)
     {
      return responseData;
     }
   
   } catch (error) {
     console.error("Error:", error.message);
   }
};
const  getLeaveorg= async () => {
     
  try {
    const response = await  fetch(apiPath + "/admin/getleaveorg", {
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
const  getLeaveorgbyid= async (id) => {
     
  try {
    const response = await  fetch(apiPath + "/admin/getleaveorgbyid", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
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
const updateLeaveStatus = async (id, status, reason) => {
  try {
      const response = await fetch(apiPath + "/admin/updateleavestatus", {
          method: "POST",
          headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id: id,
              status: status,       
              reason: reason,       
          }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
    

      if (responseData.Success) {
          return responseData;
      } else {
          throw new Error("Failed to update leave status");
      }

  } catch (error) {
      console.error("Error:", error.message);
      throw error; 
  }
};
const  getLeaveBalancesemp= async (emp,leavetype) => {
      
  try {
    const response = await  fetch(apiPath + "/admin/empleave-balances", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_id: emp,
        leaveType:leavetype
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
const  addHolidays= async (data) => {
      
  try {
    const response = await  fetch(apiPath + "/admin/addHolidays", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       data
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
const  getHolidays= async () => {
      
  try {
    const response = await  fetch(apiPath + "/admin/getHolidays",{
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


const  addOfficeTime= async (data) => {
      
  try {
    const response = await  fetch(apiPath + "/admin/addOfficeTime", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       data
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

const  getOfficeTime= async () => {
      
  try {
    const response = await  fetch(apiPath + "/admin/getOfficeTime",{
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

const  createLevel= async (levelName) => {
      
  try {
    const response = await  fetch(apiPath + "/admin/createLevel",{
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({levelName}),
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

const  getLevel= async (levelName) => {
      
  try {
    const response = await  fetch(apiPath + "/admin/getLevel",{
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



const addExtraleave= async (leaveCategoryId,data) => {
      
  try {
    const response = await  fetch(apiPath + "/admin/addExtraleave",{
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({leaveCategoryId,data}),
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

const  getExtraLeave= async () => {
  try {
    const response = await  fetch(apiPath + "/admin/getExtraLeave",
      {
      method: "GET",
      headers:{
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
    <AdminContext.Provider value={{createDepartmentType,getDepartmentTypes,updateDepartmentType,Createdepartment,departmentChanged,getDepartments, updateRole, createRole, getRoles,
      createEmployee,getEmployee, getEmployeebyid,updateactivestatus ,createStatus,getStatus,createProject,getProject,activeChanged,getProjectbyid,createTask,getTask, createLeaveType,
      getLeaveTypes,getLeaveorg,getLeaveorgbyid,updateLeaveStatus,getLeaveBalancesemp,addHolidays,getHolidays,addOfficeTime,getOfficeTime,createLevel,getLevel,addExtraleave,getExtraLeave,
      roleChanged}}>
    {props.children}
  </AdminContext.Provider>
  )
}

export default AdminState
