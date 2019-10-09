
module.exports = (express) => {

  const router = express.Router();

  router.use((req, res, next) =>  {
    next();
  });

  router.get('/', (req, res) => {
    res.send("Got it");
  });

  return router;
};