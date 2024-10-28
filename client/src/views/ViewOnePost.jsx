import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';

const ViewOnePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(userContext)
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([])

  console.log(user);
  console.log(id)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setPost(res.data.post)
        setLikes(res.data.likes)
      })
      .catch((err) => {
        console.log("Failed to fetch the post", err)
      })
  }, [id]);

  if (!post) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // Code for delete post functionality
const deletePost = (postId) => {
  axios.delete(`http://localhost:8000/api/posts/${postId}`, { withCredentials: true })
  .then(() => {
    setPost(post.filter(post => post._id !== postId))
    navigate('/bright_ideas')
  })
  .catch(err => {
    console.log("Failed to delete post", err)
  })
}

const postUser = post.user || {};



  return (
    <div className="post-details__content">
      <div className="post-details__top">
        <div className="post-user__wrapper">
          <p><Link to={`/users/${postUser._id}`}>{postUser.firstName}</Link> says:</p>
          {user._id === postUser._id && (
            <Button onClick={() => deletePost(post._id)}>Delete</Button>
          )}
        </div>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </div>
      <div className="post-details__bottom">
        <div className="post-likes__table-wrapper">
          <h4>People who like this post:</h4>
          <Table striped>
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
              </tr>
            </thead>
            <tbody>
              {likes.map(likeUser => (
                <tr key={likeUser._id}>
                  <td>{likeUser.firstName}</td>
                  <td>{likeUser.firstName} {likeUser.lastName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewOnePost;
