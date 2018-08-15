const secrets = {
  dbUri: 'mongodb://mern-user:secret123@ds121312.mlab.com:21312/jw-mern-comment-box'
};

export const getSecret = key => secrets[key];