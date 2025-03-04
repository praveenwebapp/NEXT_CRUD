"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page({ params }) {
    const searchQuery = useSearchParams()
  const mode=searchQuery.get('mode')

  const [post, setPost] = useState(null); // Initialize post as null, since the data will be an object
  const [edit, setEdit] = useState(mode ==='edit'); // Toggle between edit mode and view mode
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(null); // Store id separately to avoid conditional hooks
  const router = useRouter()
  
  useEffect(() => {
    setEdit(mode==='edit')
  }, [mode]); // Only run when id changes
  // Use a single useEffect to unwrap params and set the id
  useEffect(() => {
    if (params && params.id) {
      setId(params.id); // Unwrap and set the id
    }
  }, [params]); // Only run this effect when params changes

  // Fetch post data from the API
  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]); // Only run when id changes





  const fetchPost = async () => {
    const response = await axios.get(`http://localhost:5002/posts/${id}`);
    setPost(response.data);
    setTitle(response.data.title);
    setContent(response.data.content);
  };

  // Handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected the typo, should be 'e.preventDefault()'
    const response = await axios.put(`http://localhost:5002/posts/${id}`, { title, content });
    setEdit(false);
    fetchPost();
  };



  const handleDelete= async (id)=>{
    await axios.delete(`http://localhost:5002/posts/${id}`)

    // const filterData = post.filter(post=>post.id!==id)
    // setPost(filterData)
    router.push('/')


  }
  return (
    <div className="py-20">
      <h1 className="text-3xl text-center">{edit ? "Edit Post" : "Read Post"}</h1>
      {post && (
        <div className="flex flex-col items-center">
          {edit ? (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6 border p-6">
              <input
                type="text"
                placeholder="Title"
                value={title}
                className="p-2 border border-slate-500"
                onChange={(e) => setTitle(e.target.value)} // Use e.target.value for title
              />
              <textarea
                value={content}
                className="border border-slate-500"
                onChange={(e) => setContent(e.target.value)} // Use e.target.value for content
              ></textarea>
              <button className="w-full bg-green-300">Save</button>
            </form>
          ) : (
            <div className="mt-5">
              <h3 className="text-2xl font-bold">{post.title}</h3>
              <p>{post.content}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex space-x-4 mt-5 text-center justify-center">
        <Link href="/">
          <button onClick={()=> router.push('/')} className="bg-green-400 px-3 py-1.5">Home</button>
        </Link>
        <button
          onClick={() => setEdit(!edit)}
          className="bg-blue-300 px-3 py-1.5"
        >
          {edit ? "Cancel Edit" : "Edit"}
        </button>
        <button className="bg-red-300 px-3 py-1.5" onClick={()=>handleDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Page;
