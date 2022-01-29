import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import CommentsList from "./CommentsList";

export default function PostsList() {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://posts.com/posts');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map((post) => (
        <div
            className="card"
            style={{width: '30%', marginBottom: '20px'}}
            key={post.id}
        >
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentsList comments={post.comments} />
                <CreateComment postId={post.id} />
            </div>
        </div>
    ));

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}
