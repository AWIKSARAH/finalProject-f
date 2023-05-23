import React from "react";
import { FacebookProvider, EmbeddedPost } from "react-facebook";
const SocialMediaPosts = () => {
  return (
    <div>
      <iframe
        src="https://widgets.sociablekit.com/facebook-hashtag-posts/iframe/145612"
        frameborder="0"
        width="100%"
        height="1000"
      ></iframe>

      <iframe
        src="https://widgets.sociablekit.com/instagram-hashtag-feed/iframe/145635"
        frameborder="0"
        width="100%"
        height="1000"
      ></iframe>
    </div>
  );
};

export default SocialMediaPosts;
