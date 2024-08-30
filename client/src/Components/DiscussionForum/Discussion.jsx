import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import {
  createDiscussion,
  fetchAllDiscussions,
  comment,
} from "../../Services/DiscussionServices.js";
import "./Discussion.css";

// Mock user authentication state
const user = {
  isLoggedIn: true,
  username: "JohnDoe",
};

const Discussion = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchAllDiscussions().then((discussions) => {
      setDiscussions(discussions);
      setLoading(false);
    });
  }, []);

  const handleCreateDiscussion = () => {
    const newDis = {
      id: discussions.length + 1,
      title: newDiscussion,
      content: content,
      author: user.username,
      comments: [],
    };
    setDiscussions([...discussions, newDis]);
    setNewDiscussion("");
    setContent("");
    createDiscussion(newDis); // This will be used to create discussion in your real service
  };

  const handleAddComment = (discussionId, parentCommentId = null) => {
    const newCommentObj = {
      id: Date.now(),
      text: newComment,
      author: user.username,
      parentCommentId: parentCommentId,
      comments: [],
    };

    const updatedDiscussions = discussions.map((discussion) => {
      if (discussion.id === discussionId) {
        if (parentCommentId) {
          addNestedComment(discussion.comments, parentCommentId, newCommentObj);
        } else {
          discussion.comments.push(newCommentObj);
        }
      }
      return discussion;
    });

    setDiscussions(updatedDiscussions);
    setNewComment("");
    comment(discussionId, newCommentObj); // This will be used to add comment in your real service
  };

  const addNestedComment = (comments, parentCommentId, newCommentObj) => {
    comments.forEach((comment) => {
      if (comment.id === parentCommentId) {
        comment.comments.push(newCommentObj);
      } else if (comment.comments.length > 0) {
        addNestedComment(comment.comments, parentCommentId, newCommentObj);
      }
    });
  };

  const renderComments = (comments, discussionId) => {
    return comments.map((comment) => (
      <Box
        key={comment.id}
        p={3}
        shadow="md"
        borderWidth="1px"
        mb={4}
        ml={comment.parentCommentId ? 8 : 0}
        className="comment-box"
      >
        <Text fontWeight="bold">{comment.author}</Text>
        <Text>{comment.text}</Text>
        {user.isLoggedIn && (
          <Box mt={2}>
            <Input
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Reply to this comment"
              size="sm"
              mb={1}
            />
            <Button
              size="sm"
              onClick={() => handleAddComment(discussionId, comment.id)}
            >
              Reply
            </Button>
          </Box>
        )}
        <Divider mt={2} mb={2} />
        {comment.comments.length > 0 &&
          renderComments(comment.comments, discussionId)}
      </Box>
    ));
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const handleCloseDiscussion = (e) => {
    if (e.target.classList.contains("overlay")) {
      setSelectedDiscussion(null);
    }
  };

  return (
    <div id="home">
      {user.isLoggedIn ? (
        <VStack spacing={4} align="stretch">
          <Box>
            <Input
              value={newDiscussion}
              onChange={(e) => setNewDiscussion(e.target.value)}
              placeholder="Start a new discussion"
              mb={3}
            />
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Discussion content"
              mb={3}
            />
            <Button onClick={handleCreateDiscussion}>
              Create New Discussion
            </Button>
          </Box>
        </VStack>
      ) : (
        <Text>You must be logged in to create a discussion.</Text>
      )}
      <div className="blog-container">
        {discussions.map((discussion, index) => (
          <div
            key={`blog-${index}`}
            className="blog-box"
            onClick={() => setSelectedDiscussion(index)}
          >
            <h4 className="title">{discussion.title}</h4>
            <p className="author">By {discussion.author}</p>
            <p className="content">{discussion.content.slice(0, 200)}...</p>
          </div>
        ))}
      </div>
      {selectedDiscussion !== null && (
        <div className="overlay" onClick={handleCloseDiscussion}>
          <div className="zoomed-blog">
            <Box p={5}>
              <Box>
                <Heading as="h3" size="md">
                  {discussions[selectedDiscussion].title}
                </Heading>
                <Text mt={3}>{discussions[selectedDiscussion].content}</Text>
                <Text fontWeight="bold" mt={3} ml={3}>
                  By {discussions[selectedDiscussion].author}
                </Text>
                <Divider mt={3} mb={3} />
                <HStack>
                  <Text>
                    {discussions[selectedDiscussion].comments.length} Comments
                  </Text>
                </HStack>
                <Divider mt={3} mb={3} />
                <Text fontWeight="bold">Add a Comment</Text>
                {user.isLoggedIn && (
                  <Box>
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment"
                      mb={3}
                    />
                    <Button
                      onClick={() =>
                        handleAddComment(discussions[selectedDiscussion].id)
                      }
                    >
                      Comment
                    </Button>
                  </Box>
                )}
                <Divider mt={3} mb={3} />
                <Text fontWeight="bold">All Comments</Text>
                <Divider mt={3} mb={3} />
                <VStack spacing={5} align="stretch">
                  {renderComments(
                    discussions[selectedDiscussion].comments,
                    discussions[selectedDiscussion].id
                  )}
                </VStack>
                <Divider mt={3} mb={3} />
                <Text fontWeight="bold">End of Discussion</Text>
              </Box>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;
