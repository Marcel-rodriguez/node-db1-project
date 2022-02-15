const yup = require('yup')

const accountsModel = require('../accounts/accounts-model')

const accountPayloadSchema = yup.object({
  name: yup.string().required(),
  budget: yup.string().required()
})

const checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  try{
    const validPayload = await accountPayloadSchema.validate(req.body)
    req.body = validPayload
    next()

  } catch(err) {
    next({status: 400, message: err.message})
  }
}

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.getAll()
  .then(accounts => {
    if(accounts.includes(req.body.name)){
      res.status(500).json({message: 'Account name is taken'})
    } else {
      next()
    }
  }).catch(next)
}

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.getById( req.params.id )
  .then(account => {
    if(account){
      req.account = account
      next()
    } else {
      next({status: 404, message: `Account with id ${id} does not exist!`})
    }
  }).catch(next)
}

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
}