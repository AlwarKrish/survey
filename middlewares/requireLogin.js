module.exports = (req, res, next) => {  //next middleware is similar to done....that is wen completed it calls the next middleware after finishing running
  if(!req.user){
    return res.status(401).send({ error: 'You must log in!' });
  }
  next();
};
