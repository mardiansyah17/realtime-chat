let state = [
  {
    conversationId: "1",
    lastMessage: {
      createdAt: "2023-06-11T03:55:20.956Z",
      content: "sdfsdf",
    },
    user: {
      id: "2",
      name: "Mark Zuckerberg",
      email: "mardiansyahm12@gmail.com",
      picture: "https://example.com/pictures/jane_smith.jpg",
      createdAt: "2023-06-08T13:30:16.041Z",
      updatedAt: "2023-06-08T13:30:16.041Z",
    },
  },
  {
    conversationId: "2",
    lastMessage: {
      createdAt: "2023-06-11T03:55:16.049Z",
      content: "hehe",
    },
    user: {
      id: "3",
      name: "Eren",
      email: "eren@gmail.com",
      picture: "https://example.com/pictures/jane_smith.jpg",
      createdAt: "2023-06-08T13:30:16.041Z",
      updatedAt: "2023-06-08T13:30:16.041Z",
    },
  },
];
const payload = {
  createdAt: "2023-06-11T03:58:34.279Z",
  content: "tes",
  conversationId: "2",
};
const { createdAt, content, conversationId } = payload;
const x = state.map((data) => {
  if (data.conversationId == conversationId) {
    data.lastMessage = { createdAt, content };
  }
  return data;
});
x.sort((a, b) => {
  return a.lastMessage.createdAt > b.lastMessage.createdAt
    ? -1
    : a.lastMessage.createdAt < b.lastMessage.createdAt
    ? 1
    : 0;
});
state = x;

console.log(state);
