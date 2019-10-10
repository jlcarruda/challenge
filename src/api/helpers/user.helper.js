const { generateJwt, verifyJwt } = require('./jwt.helper');

const userSignIn = async (res, user, successCode) => {
  user.ultimo_login = Date.now();

  let responseBody = {
    id: user._id,
    data_criacao: user.createdAt,
    data_atualizacao: user.updatedAt,
    ultimo_login: user.ultimo_login
  };

  let isVerified = await verifyJwt(user.token);

  if (isVerified != false) {
    responseBody.token = user.token;
    await user.save();

    res.status(successCode || 200).json(responseBody);
  } else {
    generateJwt({ id: user._id }, '30m').then(token => {
      user.token = token;

      return user.save();
    }).then((user) => {
      responseBody.token = user.token;

      res.status(successCode || 200).json(responseBody);
    });
  }
};

module.exports = { userSignIn };