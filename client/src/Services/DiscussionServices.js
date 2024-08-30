let discussions = [
  {
    id: 1,
    title: "How to learn React?",
    author: "johnny",
    content: "I am new to React and want to learn it. Can someone guide me?",
    comments: [
      {
        id: 101,
        text: "Start with the official documentation",
        author: "JaneDoe",
        parentCommentId: null,
        comments: [],
      },
      {
        id: 102,
        text: "Try building a small project",
        author: "JohnDoe",
        parentCommentId: null,
        comments: [],
      },
    ],
  },
  {
    id: 2,
    title: "What is Redux?",
    content: "Can someone explain Redux to me?",
    author: "aloysious",
    comments: [
      {
        id: 201,
        text: "A state management tool",
        author: "Alice",
        parentCommentId: null,
        comments: [],
      },
      {
        id: 202,
        text: "Used for managing application state",
        author: "Bob",
        parentCommentId: null,
        comments: [],
      },
    ],
  },
];

const postid = 3;

export const fetchAllDiscussions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(discussions);
    }, 1000);
  });
};

export const createDiscussion = (discussion) => {
  return new Promise((resolve) => {
    let dis = { ...discussion, id: postid++ };
    discussions.push(dis);
    setTimeout(() => {
      resolve(discussion);
    }, 500);
  });
};

export const comment = (discussionId, newCommentObj) => {
  return new Promise((resolve) => {
    const discussion = discussions.find((d) => d.id === discussionId);
    if (discussion) {
      if (newCommentObj.parentCommentId) {
        addNestedComment(
          discussion.comments,
          newCommentObj.parentCommentId,
          newCommentObj
        );
      } else {
        discussion.comments.push(newCommentObj);
      }
      setTimeout(() => {
        resolve(newCommentObj);
      }, 500);
    } else {
      resolve(null);
    }
  });
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
