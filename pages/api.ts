// pages/api.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/lib/actions/patient.actions'; // Adjust the import path as needed

// Define the expected request body shape
interface User {
  name: string;
  email: string;
  phone: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user: User = req.body; // Get the user data from the request body

      const newUser = await createUser(user); // Call createUser from patient.actions.ts

      if (newUser) {
        // Respond with the created user data
        return res.status(200).json(newUser);
      } else {
        return res.status(400).json({ message: 'Failed to create user' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Respond with method not allowed if not POST
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
