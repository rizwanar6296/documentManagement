import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/axios';

function Home() {
    const [file, setFile] = useState();
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const uploadInputRef = useRef()

    useEffect(() => {
        if (search === '') {
            const fetchDocuments = async () => {
                const { data } = await axios.get('/getAlldocuments')
                setDocuments(data)
            }
            fetchDocuments()
            setLoading(false)
        }
    }, [file, search])

    useEffect(() => {
        const fetchSearchResults = async () => {
            const { data } = await axios.get('/search/' + search)
            setDocuments(data)
        }
        fetchSearchResults()
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
        <>
            <form onSubmit={handleSubmit}>
                <label>haii</label>
                <input ref={uploadInputRef} type="file" onChange={handleChange} />
                <button type="submit">Upload</button>
            </form>
            <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="text" />
            <button onClick={handleSearch} >search</button>
            {loading ? <h2>'loading...'</h2> : <div>
                <ul>
                    {documents.map((document) => (

                        <li key={document._id}>{document.orginalName}
                            <button onClick={() => handleDownload(document._id)}>download</button>
                        </li>
                    )
                    )}
                </ul>
            </div>}
        </>
    );
}

export default Home