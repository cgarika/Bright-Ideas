import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisplayUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}/stats`, { withCredentials: true });
        setUser(response.data.user);
        setPostCount(response.data.postCount);
        setLikeCount(response.data.likeCount);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div>
        <h2>Statistics</h2>
        <p><strong>Total Posts:</strong> {postCount}</p>
        <p><strong>Total Likes Received:</strong> {likeCount}</p>
      </div>
    </div>
  );
};

export default DisplayUser;
