import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from '../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export const StyledDropzone = (props) => {
  const [loading, setLoading] = useState(false)
  const { setFile } = props
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', onDrop: async acceptedFiles => {
      const formData = new FormData();
      setFile(acceptedFiles[0])
      acceptedFiles.forEach(file => {
        formData.append('docxFile', file);
      });
      try {
        const { data } = await axios.post('/upload', formData)
        setFile('')
        toast.success('file uploaded successfully');
      } catch (error) {
        toast.error('API request failed :(');
      }

    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <>
      <ToastContainer />
      <div style={{ marginTop: '10px' }} className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop Document here, or click to select files</p>
        </div>
      </div>
    </>
  );
}
