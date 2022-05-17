import { useEffect, useState } from "react"
import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { ActionDataSchema,ActionDataHandler, buttonBoxStyle, textFieldStyle} from "../utils";

 export function ActionData({data}:ActionDataSchema){
     const [action,setAction]=useState({
         disabled:false,
         visiblity:true,
         text:"Active",
         isDimmer:false,
     });
     const [dimmer,setDimmer]=useState(data?.state?.level || 0);

     useEffect(()=>{
         const actionData=ActionDataHandler(data);
         setAction(actionData);
     },[data]);

     const onDimmerChange=(event:React.ChangeEvent<{value:string}>)=>{
         const dimmerValue=+(event.target.value);
         if(dimmerValue>=1 && dimmerValue<=100){
             setDimmer(dimmerValue);
         }
     }

     const onActionClickHandler=()=>{
         if(action.text==="On"){
             setAction({
                 ...action,
                    text:"Off",
             })
        }
        else if(action.text==="Off"){
            setAction({
                ...action,
                    text:"On",
            });
        }
     }
return (
    <Box component="div" display="inline" style={buttonBoxStyle} >
      {action?.visiblity && action?.isDimmer && (
        <TextField
          variant="outlined"
          margin="dense"
          type="number"
          style={{marginTop:"0px",marginRight:"10px ",maxWidth:"120px"}}
          value={dimmer}
          onChange={onDimmerChange}
        />
      )}
      {action?.visiblity ? (
        <Button
          variant="outlined"
          color="primary"
          disabled={action.disabled}
          onClick={onActionClickHandler}
        >
          {action.text}
        </Button>
      ) : (
        "-"
      )}
    </Box>
  );
 }