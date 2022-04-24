import axios from 'axios';

import routes from './routes';

const DELAY = 500;

export const loadingStates = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
};

export function sleep(ms = DELAY) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const client = axios.create({
  baseURL: routes.apiBasePath(),
});

client.interceptors.response.use(async (response) => {
  if (process.env.NODE_ENV === 'development') await sleep();

  return response.data;
});

export const getUsers = async <Response>() => {
  const users: Response = await client.get(routes.apiUsersPath());

  return users;
};

export const getUser = async <Response>(userId: string) => {
  const user: Response = await client.get(routes.apiUserPath(userId));

  return user;
};
