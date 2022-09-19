const express = require('express');
const router = express.Router();
const controller=require('../controller/controller')
const multer=require('multer');
const mimeTypes=require('mime-types');


router.get('/',controller.Login);

router.post('/validarInicio',controller.ValidateSingIn);

router.get('/SelecionarCapacitacion/:id',controller.GoToSelect);
router.get('/SelecionarCapacitacion/:id/datos',controller.GetTablesNames);
router.get('/Capacitacion/:id/:table',(req,res)=>{
    let id= req.params.id;
    let name=req.params.table;
    res.render("Ventana_Test");
});
router.get('/Capacitacion/:id/:table/data',controller.GetTestData);

router.post('/score',controller.LoadScore);


router.get('/RegistrarUsuario',(req,res)=>{
    res.render('Ventana_Registro');
})

router.post('/Register',controller.CreateU);

router.get('/AddDB',(req,res)=>{
    res.render('Ventana_Add');
})
const storage = multer.diskStorage({
    destination: './server/public/',
    filename: function(req,file,cb){
        cb("",file.originalname+"."+mimeTypes.extension(file.mimetype));
    }
})
const upload=multer({
    storage:storage
})

router.post('/AddDB/SenVideo',upload.single('video'),controller.AddVideo);

router.post('/AddDB/SenData',controller.UploadDB);

module.exports = router;