import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CommentsList({ comments }) {
    const renderedComments = comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
    ));

    return (
        <ul>
            {renderedComments}
        </ul>
    )
}