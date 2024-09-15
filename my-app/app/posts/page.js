"use client"
import { useEffect, useState } from "react"

export default function Posts(){
    const [posts, setPosts] = useState()

    // função para carregar dados do JSON
    const fetchRecords = async () => {
        const response = await axios.get('http://localhost:5000/posts')
        setPosts(response.data)
    }

    useEffect(() => {
        fetchRecords()
    },[])

    return(
        <div>
            <h1>Posts</h1>
        </div>
    )
}