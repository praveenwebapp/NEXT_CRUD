"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Posts() {
  const [Data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5002/posts"); // replace with your API URL
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);




  const handleDelete= async (id)=>{
    await axios.delete(`http://localhost:5002/posts/${id}`)

    const filterData = Data.filter(Data=>Data.id!==id)
    setData(filterData)


  }
  return (
    <div  className="px-48 py-20">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold-">Blog Posts</h1>
        <Link href="/posts/create" className="px-4 py-1.5 bg-green-500 rounded text-white">Create New Posts</Link>
      </div>
      <table className="divide-y divide-gray-200 w-full mt-6">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-start font-medium text-gray-500 uppercase">ID</th>
            <th scope="col"  className="px-6 py-3 text-start font-medium text-gray-500 uppercase">Title</th>

            <th scope="col"  className="px-6 py-3 text-start font-medium text-gray-500 uppercase">Content</th>

            <th scope="col"  className="px-6 py-3 text-start font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Data.map((post, index) => (
            <tr key={post.id}>
              <td className="px-6 py-3 text-gray-800">{post.id}</td>
              <td  className="px-6 py-3 text-gray-800">{post.title}</td>
              <td  className="px-6 py-3 text-gray-800">{post.content}</td>
              <td className="space-x-4 px-4 py-3 text-end" >
                <Link href={`/posts/${post.id}?mode=read`}><button className="text-blue-600">Read</button></Link>
                <Link href={`/posts/${post.id}?mode=edit`}><button className="text-blue-600">Edit</button></Link>
                <button className="text-red-600" onClick={()=>handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Posts;
