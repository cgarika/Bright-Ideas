import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ViewOnePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${postId}`, { withCredentials: true });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Post Details</h1>
      <div>
        <Link to={`/user/${post.user._id}`}>{post.user.firstName}</Link>: {post.content}
      </div>
      <div>
        <h2>Users who liked this post:</h2>
        <ul>
          {post.likes.map((user) => (
            <li key={user._id}>
              <Link to={`/user/${user._id}`}>{user.firstName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewOnePost;
