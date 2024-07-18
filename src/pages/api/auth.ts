import { NextApiRequest, NextApiResponse } from 'next';
import { hash, compare } from 'bcryptjs';

type User = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

let users: User[] = [];

// Helper function to find a user by email.
const findUserByEmail = (email: string): User | undefined => users.find(user => user.email === email);

// Register a new user
export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (findUserByEmail(email)) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const hashedPassword = await hash(password, 10);
  const newUser: User = { firstname, lastname, email, password: hashedPassword };
  users.push(newUser);

  return res.status(201).json({ message: 'User registered successfully.' });
};

// Login user
export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = findUserByEmail(email);

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  return res.status(200).json({ message: 'Login successful.' });
};

// Reset password
export const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required.' });
  }

  const user = findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  user.password = await hash(newPassword, 10);

  return res.status(200).json({ message: 'Password reset successful.' });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      if (req.url === '/api/auth/register') return register(req, res);
      if (req.url === '/api/auth/login') return login(req, res);
      if (req.url === '/api/auth/reset') return resetPassword(req, res);
      return res.status(404).end('Not Found');
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
