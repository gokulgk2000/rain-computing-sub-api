const config = require("../config");
const Case = require("../models/Case");
const Client = require("../models/Client");
const Group = require("../models/Group");
const userModel = require("../models/userModel");
const axios = require("axios");

const CREATE = async (req, res) => {
  try {
    const { clientName, email, address, userId } = req.body;

    const isEmail = await Client.findOne({ email });

    if (isEmail) {
      return res.json({ msg: "Email is Already existing" });
    }

    const clientQuery = {
      userId: userId,
      clientName: clientName,
      email: email,
      address: address,
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
    const { userId } = req.body;
    const clients = await Client.find({ userId, aflag: true });
    if (clients?.length > 0) {
      return res.json({ success: true, clients: clients });
    } else return res.json({ msg: "No Clients Found" });
  } catch (err) {
    return res.json({ msg: "test" || config.DEFAULT_RES_ERROR });
  }
};

const UPDATE_CLIENT = async (req, res) => {
  try {
    const { id, clientName, email, address, userId, deleteIt } = req.body;

    const updateQuery = {
      clientName,
      email,
      address,
      userId,
      deleteIt,
    };

    if (deleteIt) {
      const deletedClient = await Client.findByIdAndUpdate(id, {
        aflag: false,
      });

      if (deletedClient) {
        return res.json({
          success: true,
          deletedClient
        });
      }
    } else {
      const existingClient = await Client.findById(id);
      if (!existingClient) {
        return res.json({
          success: false,
          msg: "Client not found.",
        });
      }

      if (clientName !== existingClient.clientName) {
        // If clientName is updated, update the corresponding Case
        const updatedClient = await Client.findByIdAndUpdate(id, updateQuery, {
          new: true,
        });

        const updatedCase = await Case.findOneAndUpdate(
          { clientName: existingClient.clientName },
          { clientName: clientName },
          { new: true }
        ).populate([
          {
            path: "caseMembers.id",
            select: "firstname lastname profilePic email",
          },
          { path: "caseMembers.addedBy", select: "firstname lastname" },
        ]);

        if (updatedClient && updatedCase) {
          return res.json({
            success: true,
            updatedClient,
            updatedCase,
          });
        } else {
          return res.json({
            success: false,
            msg: "Client or Case update failed.",
          });
        }
      } else {
        // If clientName is not updated, only update the client
        const updatedClient = await Client.findByIdAndUpdate(id, updateQuery, {
          new: true,
        });

        if (updatedClient) {
          return res.json({
            success: true,
            updatedClient,
          });
        } else {
          return res.json({
            success: false,
            msg: "Client update failed.",
          });
        }
      }
    }
  } catch (err) {
    console.log("Client update error", err);
    return res.json({ msg: err || config.DEFAULT_RES_ERROR });
  }
};
module.exports.clientController = {
  CREATE,
  GETCLIENTSBYUSERID,
  UPDATE_CLIENT
};
