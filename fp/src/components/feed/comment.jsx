// import React from 'react';
// function Feed() {
//     return ( <>
//     <h1>Feed us</h1>
//     </> );
// }

// export default Feed;

import React from "react";
import "./style.css";

function Feed({comment,key,name}) {
  return (
    <div class="comment" id={key}>
      <div class="comment-content">
        <b>jacobwiedrich101</b> {comment}
      </div>
      <div class="comment-like">
        <button class="btn-fa">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  );
}

export default Feed;
