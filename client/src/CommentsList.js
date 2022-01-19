export default function CommentsList({ comments }) {
  const renderedComments = comments.map((comment) => {
    const status = comment.status;
    let content;
    if (status === 'pending') content = "This comment is awaiting moderation.";
    if (status === 'approved') content = comment.content;
    if (status === 'rejected') content = "This comment has been rejected."
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};