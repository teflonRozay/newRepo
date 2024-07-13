/* eslint-disable react/prop-types */

const Comments = ({ comments }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-lg font-bold mb-4">Comments ({comments.length})</h2>
      {comments.map((comment, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-2">
            <img
              src={comment.profilePic}
              alt={comment.author}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <p className="text-sm text-gray-600">{comment.author}</p>
              <p className="text-sm text-gray-400">{comment.date}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
