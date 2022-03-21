class Posts {
  constructor({ axios }) {
    this.axios = axios;
  }

  post = async (req, res) => {
    const { body } = req;

    const { data: users } = await this.axios.get('https://jsonplaceholder.typicode.com/users');

    const userFound = users.find((user) => user.id === body.userId);

    if (userFound) {
      const { data } = await this.axios.post('https://jsonplaceholder.typicode.com/posts', body);
      res.status(201).send(data);
    } else {
      res.sendStatus(400);
    }
  };
}

export default Posts;
