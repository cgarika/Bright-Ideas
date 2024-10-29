import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { userContext } from '../context/userContext';

const DisplayUser = () => {
  const { id } = useParams();
  const { user } = useContext(userContext);

  const [postUser, setPostUser] = useState({})
  const [postCount, setPostCount] = useState(0)
  const [likeCount, setLikeCount] = useState(0)


  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res)
        const { USER, postCount, likeCount } = res.data;
        setPostUser(USER)
        setPostCount(postCount)
        setLikeCount(likeCount)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-content__wrapper">
      <div className="user-content">
        <div className="user-content__top">
          <p><strong>Name: </strong>{postUser.firstName} {postUser.lastName}</p>
          <p><strong>Email: </strong>{postUser.email}</p>
        </div>
        <div className="user-content__bottom">
          <p><strong>Total Number of Posts: </strong>{postCount}</p>
          <p><strong>Total Number of Likes: </strong>{likeCount}</p>
        </div>

      </div>
    </div>
  );
};

export default DisplayUser;
