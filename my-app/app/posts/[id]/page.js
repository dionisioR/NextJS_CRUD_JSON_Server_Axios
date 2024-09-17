"use client"
import axios from "axios"
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
export default function ({ params }) {
    const id = params.id;
    const searchQuery = useSearchParams()
    const mode = searchQuery.get('mode')

    const [post, setPost] = useState('')
    const [editing, setEditing] = useState(mode === 'edit')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const router = useRouter()

    useEffect(() => {
        if (id) {
            fetchPost()
        }
    }, [id])

    useEffect(() => {
        setEditing(mode === 'edit')
    },[mode])

    const fetchPost = async () => {
        const response = await axios.get(`http://localhost:5000/posts/${id}`)
        setPost(response.data)
        setTitle(response.data.title)
        setContent(response.data.content)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:5000/posts/${id}`, { title, content })
        setEditing(false)
        fetchPost()
    }

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/posts/${id}`)
        router.push('/')
    }

    return (
        <div className="py-20 text-center">
            <h1 className="text-3xl">{editing ? 'Editando post' : 'Lendo post'}</h1>

            {
                post ?
                    <div className="flex flex-col items-center">
                        {
                            editing ? (

                                <form className="flex flex-col space-y-4 mt-6 border p-6" onSubmit={handleSubmit}>
                                    <input type="text" placeholder="Title" value={title} className="p-2 border border-slate-500" onChange={(e) => setTitle(e.target.value)} />

                                    <textarea placeholder="Content" value={content} className="border border-slate-500" onChange={(e) => setContent(e.target.value)}>

                                    </textarea>
                                    <button className="w-full bg-green-300">Save</button>
                                </form>

                            )
                                :
                                <div className="mt-5">
                                    <h1 className="text-2xl font-bold">{post.title}</h1>
                                    <p>{post.content}</p>
                                </div>
                        }

                    </div>
                    :
                    <p>Loading...</p>  // Display loading message while waiting for data
            }
            <div className="flex space-x-4 mt-5">
                {/* <Link href="/">
                    <button className="w-full bg-green-400 px-3 py-1.5">Home</button>
                </Link> */}
                <button onClick={() => router.push('/')} className="w-full bg-green-400 px-3 py-1.5">Home</button>
                <button onClick={() => setEditing(!editing)} className="w-full bg-blue-300 px-3 py-1.5">Edit</button>
                <button onClick={handleDelete}  className="w-full bg-red-300 px-3 py-1.5">Delete</button>
            </div>
        </div>

    )
}

// {
//     post && (
//         <div>
//             <h1>{post.title}</h1>
//             <p>{post.content}</p>
//         </div>
//     )
// }
