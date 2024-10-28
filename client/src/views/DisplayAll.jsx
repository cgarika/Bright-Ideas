import React, {useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { userContext } from '../context/userContext';


const DisplayAll = (props) => {
  const {errors, errorUpdater} = props;

  const { user } = useContext(userContext)
  const navigate = useNavigate();

  console.log(user)

  // Initialize State for the 'Add Post' form
  const [postData, setPostData] = useState({
    content: ""
  })

  const [postErrors, setPostErrors] = useState({
    content: ""
  })

  // Initialize state for the get all posts functionality
  const [posts, setPosts] = useState([])

  // Code for the get ll posts goes here
  useEffect(() => {
    axios.get('http://localhost:8000/api/posts')
    .then((res) => {
      console.log("Posts fetched", res.data)
      setPosts(res.data);
    })
    .catch((err) => {
      console.log("Posts failed to load", err)
    })
  }, [])


  // Code for the post form validations go here
  const postContentHandler = (e) => {
    const value = e.target.value;
    let errorMsg = '';
      if (value) {
        if (value.length < 10) {
          errorMsg = "Idea must be at least 10 characters long";
        } else if (value.length > 255) {
          errorMsg = "Idea cannot exceed 255 characters!";
        }
      } else {
        errorMsg = "Idea is required!"
      }
      setPostData((prevPostData) => ({...prevPostData, content: value}));
      setPostErrors((prevPostErrors) => ({...prevPostErrors, content: errorMsg}))
  }


  // Code for the create post goes here
const createPost = (e) => {
  e.preventDefault();
  const newPost = {
    content: postData.content,
    user: user._id
  };
  console.log(newPost)
  axios.post('http://localhost:8000/api/posts', newPost, { withCredentials: true })
  .then((res) => {
    setPosts([res.data, ...posts])
    setPostData({ content: ""})
  })
  .catch((err) => {
    console.log("Failed to create post", err)
  })
}

// Code for delete post functionality
const deletePost = (postId) => {
  axios.delete(`http://localhost:8000/api/posts/${postId}`, { withCredentials: true })
  .then(() => {
    setPosts(posts.filter(post => post._id !== postId))
  })
  .catch(err => {
    console.log("Failed to delete post", err)
  })
}

// Code for liking a post
const createLike = (postId) => {
  const likeData = {
    userId: user._id,
    postId: postId
  };
  axios.post('http://localhost:8000/api/likes', likeData, { withCredentials: true })
    .then((res) => {
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return { ...post, likes: [...post.likes, user._id]};
        }
        return post;
      }));
      console.log("Like created: ", res.data)
    })
    .catch((err) => {
      console.log("Failed to like post", err.message)
    });
};


  return (
    <div className='main-body__dashboard'>
      <div className="dashboard-content">
        <h3 className='dashboard-heading'>Hi, {user.firstName}!</h3>
        <div className="dashboard-content__top">
          <div className="post-form__wrapper">
            <form onSubmit={createPost} className='post-form'>
              <div className="post-input__wrapper">
                <input type="text" name="content" id="content" className='post-input__field' value={postData.content} onChange={postContentHandler} />
                {postErrors.content && <p style={{color:"red"}} >{postErrors.content}</p>}
              </div>
              <div className="post-button__wrapper">
                <Button type='submit' variant='primary'>Idea!</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="dashboard-content__bottom">
          {posts.map((post) => (
            <div className="post-wrapper" key={post._id}>
              <div className="post-content__wrapper">
                <div className="post-user__wrapper">
                  <p><Link to={`/users/${post.user._id}`}>{post.user.firstName}</Link> says:</p>
                  {user._id === post.user._id && (
                    <Button onClick={() => deletePost(post._id)}>Delete</Button>
                  )}
                </div>
                <div className="post-content">
                  <p>{post.content}</p>
                </div>
              </div>
              <div className="post-links__wrapper">
                <Link onClick={() => createLike(post._id)}>Like</Link>
                <div className="post-links">
                  <p><Link to={`/bright_ideas/${post._id}`}>{post.likes.length} {post.likes.length === 1 ? 'person' : 'people'}</Link> like this</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayAll;