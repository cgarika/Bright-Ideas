import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { userContext } from '../context/userContext';

const DisplayAll = (props) => {
  const {errors, errorUpdater} = props;

  const {user, setUser} = useContext(userContext)
  const navigate = useNavigate();

  // Initialize State for the 'Add Post' form
  const [postData, setPostData] = useState({
    content: ""
  })

  // Initialize state for the get all posts functionality
  const [posts, setPosts] = ([])

  // Code for the get ll posts goes here


  // Code for the post form validations go here


  // Code for the create post goes here



  return (
    <div className='main-body__dashboard'>
      <div className="dashboard-content">
        <div className="dashboard-content__top">
          <div className="post-form__wrapp">
            <form action="">
              <div className="post-input__wrapper">
                <input type="text" name="content" id="content" />
              </div>
              <div className="post-button__wrapper">
              <Button type='submit' variant='primary'>Idea!</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="dashboard-content__bottom">
          <div className="post-wrapper">
            <div className="post-user__wrapper">
              <p>User says: </p>
            </div>
            <div className="post-content">
              This is dummy content.  Enjoy....
            </div>
          </div>
          <div className="post-links__wrapper">
            <p>Like</p>
            <div className="post-links">
              <p>31 people like this</p>
            </div>
          </div>
          
        </div>
      </div>
      <h1>Login Successful!</h1>
    </div>
  )
}

export default DisplayAll;