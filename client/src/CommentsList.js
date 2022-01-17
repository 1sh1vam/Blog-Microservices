import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CommentsList({ postId }) {
    const [comments, setComments] = useState([]);

    const fetchPosts = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedComments = comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
    ));

    return (
        <ul>
            {renderedComments}
        </ul>
    )
}