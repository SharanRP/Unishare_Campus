export const getSender = (loggedUser, users) => {
    return (
        users[0]?._id === loggedUser?._id ? users[1].name : users[0].name
        )
  };

  export const getSenderDetails = (loggedUser, users) => {
    return (
        users[0]?._id === loggedUser?._id ? users[1] : users[0]
        )
  };

  // export const getSenderPic = (loggedUser, users) => {
  //   return (
  //       users[0]?._id === loggedUser?._id ? users[1].pic : users[0].pic
  //       )
  // };

  export const getSenderPic = (loggedUser, users) => {
    const defaultAvatarUrl = 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg';

    if (users.length >= 2) {
      const sender = users[0]?._id === loggedUser?._id ? users[1] : users[0];
      if (sender.pic && sender.pic !== defaultAvatarUrl) {
        return sender.pic;
      } else {
        return `https://api.multiavatar.com/${sender.name}.png`;
      }
    } else {
      return defaultAvatarUrl;
    }
  };


  export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);

    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };

  export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
