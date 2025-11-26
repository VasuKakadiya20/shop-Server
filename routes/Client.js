const express = require('express');
const { Client } = require('../models/Client');
const router  = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { cname, Email, phonenumber } = req.body;

        if (!cname || !Email || !phonenumber) {
            return res.status(400).json({ msg: "All fields required!" });
        }

        let client = new Client({
            cname,
            Email,
            phonenumber
        });

        console.log(client);

        client = await client.save();
        res.status(201).json(client);
        console.log("client added", client)

    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req,res) =>{
 try {
        const client = await Client.find({});
        res.json(client);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.delete('/:id',async(req,res)=>{
    try{
         const deleteclient = await Client.findById(req.params.id);
            if (!deleteclient) {
              return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json(deleteclient);
    }catch(error){
        console.error(error)
        res.status(500).json({error:error.message})
    }
})

router.put('/:id',async(req,res)=>{
try{
    let updateData = {
        cname:req.body.cname,
        Email:req.body.Email,
        phonenumber:req.body.phonenumber
    }

    const client = await Client.findByIdAndUpdate(req.params.id , updateData, {new:true})
    
    if(!client){
        return res.status(404).json({message: "update Failed", status:false})
    }
    res.status(200).json({message: 'Client updated!',status:true,client})

}catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;
