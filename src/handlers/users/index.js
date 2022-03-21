class Users {
  constructor({ axios }) {
    this.axios = axios;
  }

  get = async (req, res) => {
    const { data } = await this.axios.get('https://jsonplaceholder.typicode.com/users');
    res.status(200).send(data);
  };

  post = async (req, res) => {
    const { body } = req;

    const { data } = await this.axios.post('https://jsonplaceholder.typicode.com/users', body);
    res.status(201).send(data);
  };

  put = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    await this.axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);
    res.sendStatus(204);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    await this.axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    res.sendStatus(204);
  };
}

export default Users;
