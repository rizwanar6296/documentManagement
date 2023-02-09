import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/axios';
import { Button, ButtonBase, Card, Container, Icon, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { Download, Search } from '@mui/icons-material'
import Dropzone from 'react-dropzone'
import { StyledDropzone } from '../components/StyledDropzone';

function Home() {
    const [file, setFile] = useState();
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const uploadInputRef = useRef()

    useEffect(() => {
        if (!search) {
            const fetchDocuments = async () => {
                const { data } = await axios.get('/getAlldocuments')
                setDocuments(data)
            }
            fetchDocuments()
            setLoading(false)
        }
    }, [file, search])

    useEffect(() => {
        if (search) {
            const fetchSearchResults = async () => {
                const { data } = await axios.get('/search/' + search)
                setDocuments(data)
            }
            fetchSearchResults()
        }
    }, [search])

    const handleChange = (event) => {
        const filename = event.target.files[0]
        console.log(event.target.files[0])
        console.log('sdfsdf', filename.name)
        setFile(event.target.files[0]);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("docxFile", file);
        try {
            const response = await axios.post('/upload', formData)
            if (!response.status == 200) {
                throw new Error("Failed to upload file");
            }
            console.log("File uploaded successfully");
            uploadInputRef.current.value = null
            setFile(null)

        } catch (error) {
            console.error(error);
        }
    };

    const handleDownload = async (docId) => {
        const { data } = await axios.get("/downloadDocument/" + docId, { responseType: "blob" })
        const file = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    }

    const handleSearch = async () => {
        const { data } = await axios.get('/search/' + search)
        setDocuments(data)
    }


    return (
        <Container sx={{ display: 'flex', marginTop: '50px', justifyContent: 'center', marginX: 'auto' }}>
            <Card sx={{ width: { xs: '100%', md: '70%' } }}>
                <StyledDropzone setFile={setFile} />
                <Box>
                    <Box display={'flex'} padding={'20px 20px 0px 20px'}>
                        <TextField sx={{ width: '100%', marginRight: '20px' }} value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" label="Search" InputProps={{ endAdornment: (<InputAdornment> <IconButton> <Search /> </IconButton> </InputAdornment>) }} />
                    </Box>
                    {documents.map((document) => (
                        <>
                            <Card key={document._id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', padding: '0px 40px' }}>
                                <Box flex={1} display={'flex'} alignItems={'center'}>
                                    <Icon>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 96 96">
                                            <path stroke="#979593" d="M67.1716 7H27c-1.1046 0-2 .8954-2 2v78c0 1.1046.8954 2 2 2h58c1.1046 0 2-.8954 2-2V26.8284c0-.5304-.2107-1.0391-.5858-1.4142L68.5858 7.5858C68.2107 7.2107 67.702 7 67.1716 7z" />
                                            <path fill="none" stroke="#979593" d="M67 7v18c0 1.1046.8954 2 2 2h18" />
                                            <path fill="#C8C6C4" d="M79 61H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1zm0-6H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1zm0-6H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1zm0-6H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1zm0 24H48v-2h31c.5523 0 1 .4477 1 1s-.4477 1-1 1z" />
                                            <path fill="#185ABD" d="M12 74h32c2.2091 0 4-1.7909 4-4V38c0-2.2091-1.7909-4-4-4H12c-2.2091 0-4 1.7909-4 4v32c0 2.2091 1.7909 4 4 4z" />
                                            <path d="M21.6245 60.6455c.0661.522.109.9769.1296 1.3657h.0762c.0306-.3685.0889-.8129.1751-1.3349.0862-.5211.1703-.961.2517-1.319L25.7911 44h4.5702l3.6562 15.1272c.183.7468.3353 1.6973.457 2.8532h.0608c.0508-.7979.1777-1.7184.3809-2.7615L37.8413 44H42l-5.1183 22h-4.86l-3.4885-14.5744c-.1016-.4197-.2158-.9663-.3428-1.6417-.127-.6745-.2057-1.1656-.236-1.4724h-.0608c-.0407.358-.1195.8896-.2364 1.595-.1169.7062-.211 1.2273-.2819 1.565L24.1 66h-4.9357L14 44h4.2349l3.1843 15.3882c.0709.3165.1392.7362.2053 1.2573z" />
                                        </svg>
                                    </Icon>
                                    <Typography variant='h6'>{document.orginalName}</Typography>
                                </Box>
                                <Button onClick={() => handleDownload(document._id)} variant='outlined'>
                                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 16 16" className="bi bi-download me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                                        <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
                                    </svg>

                                </Button>
                            </Card>
                        </>
                    )
                    )}
                </Box>
            </Card>
        </Container>


    );
}

export default Home