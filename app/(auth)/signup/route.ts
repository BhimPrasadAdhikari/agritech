// app/api/auth/signup/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { signupHandler } from '../../api/auth/[...nextauth]';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  await signupHandler(req, res);
}
