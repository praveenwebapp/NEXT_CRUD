'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Create() {

    const [title, setTitle]=useState('')
    const [content, setContent]=useState('')
    const  router = useRouter()

    const handeSubmit=async (e)=>{
        e.preventDefault()
        await axios.post('http://localhost:5002/posts',{title,content})
        router.push('/')

    
    }

  return (
    <div className="flex flex-col items-center py-20">
      <h1 className="text-3xl"> create new post</h1>
      <form
        onSubmit={handeSubmit}
        className="flex flex-col space-y-4 mt-6 border p-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="p-2 border border-slate-500"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
         
          placeholder="Content"
          value={content}
          className=" border border-slate-500 p-2"
          onChange={(e)=>setContent(e.target.value)}
        />
    
      <button className="w-full bg-green-300 py-1.5 cursor-pointer">Create Post</button>
      </form>
    </div>
  );
}

export default Create;
