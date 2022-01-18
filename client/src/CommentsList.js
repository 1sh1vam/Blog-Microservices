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