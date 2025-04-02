import { FiMessageSquare } from 'react-icons/fi';
import './comments.css';

const CommentsSection = ({ 
  comments, 
  teamMembers, 
  newComment, 
  onCommentChange, 
  onAddComment 
}) => {
  return (
    <div className="comments-container">
      <h2 className="comments-header">Discussion</h2>
      
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">
                  {teamMembers.find(m => m.id === comment.author)?.name || 'Unknown'}
                </span>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet. Start the discussion!</p>
        )}
      </div>
      
      <div className="comment-input-container">
        <input
          type="text"
          placeholder="Add a comment..."
          className="comment-input"
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <button
          onClick={onAddComment}
          className="comment-submit"
        >
          <FiMessageSquare />
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;