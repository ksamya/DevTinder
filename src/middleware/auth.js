const adminAuth = (req, res, next) => {
  const token = "ABC";
  const isAuthorised = token === "ABC";
  if (!isAuthorised) {
    res.status(401).send("unauthorised request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isUserAuthorised = token === "xyz";
  if (!isUserAuthorised) {
    res.status(401).send("unauthorised user");
  } else {
    next();
  }
};

module.exports={adminAuth,
  userAuth
}
