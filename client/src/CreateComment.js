import axios from "axios";
import React, { useState } from "react";

export default function CreateComment({ postId }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        })
        setContent('');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{marginBottom: '10px'}}>
                    <label>New Comment</label>
                    <input value={content} onChange={(e) => setContent(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}