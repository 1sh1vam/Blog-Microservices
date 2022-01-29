import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://posts.com/posts', {title});
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{marginBottom: '20px'}}>
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};