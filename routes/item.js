const express = require('express')
const { Item } = require('../models/item')
const router  = express.Router()

router.post("/create", async (req, res) => {
  try {
    const lastInvoice = await Item.findOne({ invoiceNo: { $exists: true } }).sort({ invoiceNo: -1 });

    let nextNumber = 1;
    if (lastInvoice && lastInvoice.invoiceNo) {
      const numericPart = parseInt(lastInvoice.invoiceNo.replace("INV", ""));
      nextNumber = numericPart + 1;
    }

    const invoiceNo = "INV" + nextNumber.toString().padStart(4, "0");
    const { cname, Payment, Date, items ,addgst} = req.body;
    const newItem = new Item({
      invoiceNo,
      cname,
      Payment,
      Date,
      items,
      totalitems: items.length,
      addgst,
    });

    await newItem.save();
    res.status(201).json(newItem);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/",async (req,res)=>{
    try {
        const item = await Item.find({})
        return res.status(200).json(item)
        
    } catch (error) {
         console.error(error);
    res.status(500).json({ error: error.message });
    }
})

router.delete("/:id",async (req,res)=>{
    try{
           const deleteitem = await Item.findByIdAndDelete(req.params.id);
    if (!deleteitem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Deleted Item' ,deleteitem});

    }catch(error){
        console.error(error);
        res.status(500).json({error:error.message})
    }
})

router.put("/:id" ,async(req,res) =>{
  try{
   let updatedata = {
    cname:req.body.cname,
    Payment:req.body.Payment,
    Date:req.body.Date,
    invoiceNo:req.body.invoiceNo,
    items:req.body.items,
    totalitems:req.body.totalitems,
    addgst:req.body.addgst
   }
    const updateitem = await Item.findByIdAndUpdate(req.params.id, updatedata, { new: true });

    if (!updateitem) {
      return res.status(404).json({ message: 'Update failed', status: false });
    }
    res.status(200).json({ message: 'Item updated!', status: true, updateitem });

  }catch(error){
    console.error(error)
    res.status(500).json({error:error.message})
  }
})  

module.exports = router;