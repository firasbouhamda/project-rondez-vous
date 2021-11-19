// const express = require('express');
// var router = express.Router();
//  const Client = require('../models/ClientModel')

// router.get('/', (req, res) => {
//     res.render("client/addOrEdit", {
//         viewTitle: "Insert Client"
//     });
// });

// router.post('/', (req, res) => {
//     if (req.body._id == '')
//         insertRecord(req, res);
//     else
//         updateRecord(req, res);
// });


// function insertRecord(req, res) {
//     var client = new Client();
//     client.fullName = req.body.fullName;
//     client.email = req.body.email;
//     client.mobile = req.body.mobile;
//     client.adress = req.body.adress;
//     client.type = req.body.type;
//     client.serviceTypeId = req.body.serviceTypeId;
//     client.save((err, doc) => {
//         if (!err)
//             res.redirect('clients/list');
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("clients/addOrEdit", {
//                     viewTitle: "Insert Client",
//                     client: req.body
//                 });
//             }
//             else
//                 console.log('Error during record insertion : ' + err);
//         }
//     });
// }

// function updateRecord(req, res) {
//     Client.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
//         if (!err) { res.redirect('clients/list'); }
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("clients/addOrEdit", {
//                     viewTitle: 'Update Client',
//                     client: req.body
//                 });
//             }
//             else
//                 console.log('Error during record update : ' + err);
//         }
//     });
// }


// router.get('/list', (req, res) => {
//     Client.find((err, docs) => {
//         if (!err) {
//             res.render("clients/list", {
//                 list: docs
//             });
//         }
//         else {
//             console.log('Error in retrieving client list :' + err);
//         }
//     });
// });


// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'fullName':
//                 body['fullNameError'] = err.errors[field].message;
//                 break;
//             case 'email':
//                 body['emailError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }

// router.get('/:id', (req, res) => {
//     Client.findById(req.params.id, (err, doc) => {
//         if (!err) {
//             res.render("clients/addOrEdit", {
//                 viewTitle: "Update Client",
//                 client: doc
//             });
//         }
//     });
// });

// router.get('/delete/:id', (req, res) => {
//     Client.findByIdAndRemove(req.params.id, (err, doc) => {
//         if (!err) {
//             res.redirect('/clients/list');
//         }
//         else { console.log('Error in client delete :' + err); }
//     });
// });

// module.exports = router;


const Clients = require('../models/ClientModel')

const { google } = require('googleapis')
const { OAuth2 } = google.auth
const fetch = require('node-fetch')

 const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const { CLIENT_URL } = process.env

const clientCtrl = {
    registerClient: async (req, res) => {
        try {
            const { fullName, email, mobile, adress, city } = req.body


            if (!fullName || !email || !mobile || !adress || !city)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalide email." })

            const newClient = {
                fullName, email, mobile, adress, city
            }

            res.json({ msg: "Register Success! " })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },


    getClientInfor: async (req, res) => {
        try {
            const client = await Clients.findById(req.client.id).select('fullName')

            res.json(client)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getClientsAllInfor: async (req, res) => {
        try {
            const clients = await Clients.find().select('fullName')

            res.json(clients)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateClient: async (req, res) => {
        try {
            const { fullName, email } = req.body
            await Clients.findOneAndUpdate({ _id: req.client.id }, {
                fullName, email
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateClientsType: async (req, res) => {
        try {
            const { type } = req.body

            await Clients.findOneAndUpdate({ _id: req.params.id }, {
                type
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteClient: async (req, res) => {
        try {
            await Clients.findByIdAndDelete(req.params.id)

            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


module.exports = clientCtrl;

