export interface SignUpUser {
  username: string;
  email: string;
  password: string;
  role: string;
  tmdb_key: string;
}

export interface SignInUser {
  accessToken: string;
  user: User;
  role: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  role: string;
  tmdb_key: string;
}

// export interface UpdateUser {
//   username: string;
//   email: string;
//   password: string;
//   role: string;
//   tmdb_key: string;
//   accessToken: string;
// }
