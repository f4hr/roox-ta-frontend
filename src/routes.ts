const host = '';
const api = process.env.REACT_APP_API_URL;

export default {
  homePath: () => '/',
  usersPath: () => [host, 'users'].join('/'),
  userPath: (id: string) => [host, 'users', id].join('/'),
  apiBasePath: () => api,
  apiUsersPath: () => [api, 'users'].join('/'),
  apiUserPath: (id: string) => [api, 'users', id].join('/'),
};
