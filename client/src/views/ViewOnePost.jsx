import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';

const ViewOnePost = () => {
  const { id } = useParams();
  const { user } = useContext(userContext)
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setPost(res.data)
      })
      .catch((err) => {
        console.log("Failed to fetch the post", err)
      })
  }, [id]);



  return (
    <div className="post-details__content">
      <div className="post-details__top">
        <div className="post-content__wrapper">
          <div className="post-user__wrapper">
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOnePost;
