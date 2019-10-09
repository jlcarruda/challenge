
module.exports = (app, express) => {
  app.use('/users', require("./controllers/user_controller")(express));
};