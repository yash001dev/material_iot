import React from 'react';
import { CircularProgress } from '@mui/material';
import { loaderStyle, LoaderSchema, loaderInnerStyle } from '../utils';


export function Loader({color}:LoaderSchema){
    return(
        <div style={{display:"flex",margin:"auto",position:"fixed",top:"0",left:"0",right:"0",bottom:"0"}} >
            <CircularProgress style={loaderInnerStyle} color={color} />
        </div>
    )
}