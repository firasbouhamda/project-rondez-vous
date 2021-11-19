const router = require('express').Router()
const clientCtrl = require('../controllers/clientCtrl')


router.post('/registerClient', clientCtrl.registerClient)
router.get('/inforClient', clientCtrl.getClientInfor)

router.get('/all_inforClient', clientCtrl.getClientsAllInfor)
router.patch('/updateClient', clientCtrl.updateClient)

router.patch('/update_type/:id', clientCtrl.updateClientsType)

router.delete('/deleteClient/:id', clientCtrl.deleteClient)



module.exports = router