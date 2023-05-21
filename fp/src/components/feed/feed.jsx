// import React from 'react';
// function Feed() {
//     return ( <>
//     <h1>Feed us</h1>
//     </> );
// }

// export default Feed;

import React,{useState} from "react";
import "./style.css";
import TimeAgo from "react-timeago";
import Comment from "./comment";
function Feed({ totalPages, limit, data }) {
  console.log(data.idDisaster.start_time);
  const startTime = data.idDisaster && data.idDisaster.start_time;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const characterLimit = 100;
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      <div class="post-container">
        <div class="post-author-container">
          <div class="post-author-info">
            <div class="name">
              <a href="#">
                <span class="username">{data.title}</span>
              </a>
            </div>
            <div class="ago">
              {data.idDisaster && <TimeAgo date={data.idDisaster.start_time} />}{" "}
            </div>
          </div>
          <div class="post-ellipsis">
            <i class="fa-solid fa-ellipsis"></i>
          </div>
        </div>
        <div className="post-content-container">
          <div class="post-image-container">
            <img
              src={`http://localhost:5000${data.idPerson.image}`}
              class="post-image"
              alt=""
            />
          </div>
          <div class="post-items-container">
            <div class="post-actions">
              <div className="left">
                <p>
                  {showFullDescription
                    ? data.description
                    : data.description.slice(0, characterLimit) + "..."}
                </p>
                {data.description.length > characterLimit && (
                  <a className="btn-fa" onClick={toggleDescription} style={{fontSize:"12px"}}>
                    {showFullDescription ? "Read Less" : "Read More"}
                  </a>
                )}
              </div>
              <div class="right">
                <button class="btn-fa">
                  <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
            <div class="post-stats">
              <div class="comments-count">{data.totalcomments} Comments</div>
            </div>
            <div class="comments-container">
              {data.reactionId.map((comment) => (
                <Comment comment={comment.comment} key={comment._id} />
              ))}
              {/* </div> */}
            </div>
            <div class="new-comment-container">
              <form action="#" class="new-comment-form">
                <textarea class="form-control" id="new_comment"></textarea>
                <a href="" class="btn btn-primary">
                  Post
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
