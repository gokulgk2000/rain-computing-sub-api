const config = require("../config");
const Case = require("../models/Case");
const Client = require("../models/Client");
const Group = require("../models/Group");
const userModel = require("../models/userModel");
const axios = require("axios")

const CREATE = async (req, res) => {
    try {
        const { clientName, clientId, email, address,userId } = req.body;

        const isClientId = await Client.findOne({ clientId });

        if (isClientId) {
            return res.json({ msg: "Client Id Already existing" });
        }

        const clientQuery = {
            
            userId: userId,
            clientName: clientName,
            email: email,
            address: address,
            clientId: clientId,
            
        };

        const createClient = await Client.create(clientQuery);
        if (createClient) {
            return res.json({
                success: true,
                createClient,
                msg: "New client is Created",
            });
        }
    } catch (err) {
        return res.json({ msg: err || config.DEFAULT_RES_ERROR });
    }
};

const GETCLIENTSBYUSERID = async (req, res) => {
    try {
      const { userId} = req.body;
    const clients = await Client.find({userId})
      if (clients?.length > 0){
        return res.json({ success: true, clients: clients});}
      else return res.json({ msg: "No Clients Found" });
    } catch (err) {
      return res.json({ msg: "test" || config.DEFAULT_RES_ERROR });
    }
  };


  const DELETECLIENT = async (req, res) => {
    try {
      const { clientId,userId} = req.body;
    const client = await Client.find({clientId,userId})
      if (client){
        return res.json({ success: true, client: client});}
      else return res.json({ msg: "No Clients Found" });
    } catch (err) {
      return res.json({ msg: "test" || config.DEFAULT_RES_ERROR });
    }
  };

module.exports.clientController = {
    CREATE,
    GETCLIENTSBYUSERID,
   
};