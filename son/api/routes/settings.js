const express = require('express');
const router = express.Router();

router.post('settings',function(req,res,next){
    // aici faci chestii in functie de request, si la res o sa pui eventual noile setari, sau true/false daca a reusit call-ul
});

module.exports = router;