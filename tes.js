const x = [
  {
    conversationId: "7b5c75a6-6136-4459-b7c0-ff0db5ec06bb",
    lastMessage: {
      createdAt: "2023-06-12T04:44:02.558Z",
      content: "woi",
    },
    user: {
      id: "2",
      name: "Mark Zuckerberg",
      email: "mardiansyahm12@gmail.com",
      picture: "https://example.com/pictures/jane_smith.jpg",
      createdAt: "2023-06-12T02:32:26.661Z",
      updatedAt: "2023-06-12T02:32:26.661Z",
    },
  },
];

const is = x.find((data) => data.conversationId == "7b5c75a6-6136-4459-b7c0-ff0db5ec06bb");
console.log(is);
