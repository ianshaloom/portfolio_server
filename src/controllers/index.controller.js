const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://fugitech_ian:b6MDqnaCBRLGbtH@localhost:5432/fugitech_ianshaloom	",
  ssl: process.env.DATABASE_URL ? true : false,
});

const getMessages = async (req, res) => {
  // console.log(req);

  try {
    const response = await pool.query("SELECT * FROM messages");
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    res.send("Error: " + error);
  }
};

const getMessageById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  res.json(response.rows);
};

const createMessage = async (req, res) => {
  const { name, email, project, message } = req.body;
  const response = await pool.query(
    "INSERT INTO messages(name, email, project, message) VALUES($1, $2, $3, $4)",
    [name, email, project, message]
  );
  console.log(response);
  res.json({
    message: "Message Added Successfully",
    body: {
      message: { name, email, project, message },
    },
  });
};

const deleteMessage = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  console.log(response);
  res.json(`Message ${id} deleted successfully`);
};

const updateMessage = async (req, res) => {
  const id = req.params.id;
  const { name, email, project, message } = req.body;
  const response = await pool.query(
    "UPDATE messages SET name = $1, email=$2, project=$3, message=$4 WHERE id = $5",
    [name, email, project, message, id]
  );
  console.log(response);
  res.json("Message updated successfully");
};

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
  deleteMessage,
  updateMessage,
};
