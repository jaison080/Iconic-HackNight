
import React, { useRef, useEffect, useState, useCallback } from 'react'
import axios from 'axios';
import { toPng } from 'html-to-image';
import { AppBar, Button, IconButton, Toolbar, Typography , MenuIcon } from '@mui/material';



const Canvas = ({text}) => {
  
  const ref = useRef(null)

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }
    toPng(ref.current, { cacheBust: true, })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'my-image-name.png'
      link.href = dataUrl
      link.click()
    })
    .catch((err) => {
      console.log(err)
    })
}, [ref])
  const BASEURL = 'http://localhost:3000';
  const canvasRef = useRef(null);
  const linkRef = useRef(null);
  const [dataURL, setDataUrl] = useState(null);
  const [data,setData]=useState(null);

  const ComponentToPrint = (props, ref) => (
    <div ref={ref}>{data}</div>

  );


  
  function download() {
    // console.log("hello" + threadLink);
    // console.log(`${BASEURL}/api/tweet/${threadLink.split('/')[-1]}`);
    // axios.get(`${BASEURL}/api/tweet/${threadLink.split('/')[-1]}`,)
  var _Id = text.substr(text.lastIndexOf('/') + 1);
    axios.get(`${BASEURL}/api/tweet/${_Id}`)
    .then(response => {
        // If request is good...
       setData(response.data.text.data.text);
      })
    .catch((error) => {
        console.log('error ' + error);
      });

    
  }
  return (
    <>
     
     
      
      <Button variant="contained" onClick={download}>Go</Button>
      <br/>
      <div ref = {ref} style={{width:"100% !important"}}>
        <div style = {{
          flexGrow:1, 
          display: 'flex',  
          justifyContent: 'center', 
          alignItems: 'center',
         

          }}>
      <div style={{
      width: '70%', 
      height: '100%', 
      backgroundColor: '#fff', 
      border:"1px solid #000",
      borderRadius:"30px",
      padding:"10px",
      wordBreak:"break-all",
      fontSize:"25px",
      }}>
        {data}
        </div></div>
      </div>
      <br/>
      {data?<Button variant="contained" onClick={onButtonClick}>Download</Button>:null}
    </>
  )
}
export default Canvas;
