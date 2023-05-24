import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TimeAgo from "react-timeago";
import { IconButton, Pagination } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Feed = ({ totalPages, limit, data }) => {
  const startTime = data.idDisaster && data.idDisaster.start_time;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const characterLimit = 100;
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.section
        className="article-section"
        key={data.id} // Add a unique key for smoother transitions
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="article-component">
          <motion.div
            className="article__img"
            style={{
              backgroundImage: `url(http://localhost:5000${data.idPerson.image})`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          ></motion.div>

          <div className="article__content">
            <h2 className="article__title">{data.title}</h2>
            <p className="article__desc">
              {showFullDescription
                ? data.description
                : data.description.slice(0, characterLimit) + "..."}
            </p>
            <div className="article__user">
              <div className="user__info">
                <div className="user__details">
                  <h3 className="user__name">Michelle Appleton</h3>
                  <p className="user__date">
                    {data.idDisaster && (
                      <TimeAgo date={data.idDisaster.start_time} />
                    )}
                  </p>
                </div>
              </div>
              <Link to={`/a/${data._id}`}>
                <IconButton className="share-icon" color="primary">
                  <ArrowForwardIcon />
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Feed;
