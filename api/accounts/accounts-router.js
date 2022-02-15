const router = require('express').Router()

const accountsModel = require('./accounts-model') 

const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.getAll()
  .then(resp => {
    res.status(200).json(resp)
  }).catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.getById(req.params.id)
  .then(account => {
    res.status(200).json(account)
  }).catch(next)
})

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.create(req.body)
  .then(resp => {
    res.status(201).json(resp)
  }).catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    accountsModel.updateById(req.params.id, req.body)
    let updated = await accountsModel.getById(req.params.id)
    res.status(200).json(updated)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const deletedAccount = await accountsModel.getById(req.params.id)
  let deletedInfo = {
    ...deletedAccount,
    message: "Account has been deleted"
  }
  
  try{
    const deleteAccount = await accountsModel.deleteById(req.params.id)
    res.status(200).json(deletedInfo)
  }catch(err){
    next(err.message)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    custom: "Something went wrong in the actions router",
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
