import React from 'react';
import CreatePost from './CreatePost';
import PostsList from './PostsList';

export default function App() {
    return (
        <div className="container">
            <h1>Create Post</h1>
            <CreatePost />
            <hr />
            <h1>Posts........</h1>
            <PostsList />
        </div>
    )
};