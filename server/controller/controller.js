const controller={}
const { GoogleSpreadsheet } = require('google-spreadsheet');
const {promisfy} =require('until');
const creds=require("./google.json");
const path=require('path');

controller.Login= (req,res)=>{
    
    res.render('Ventana_inicio')
};
async function Validate(user,password){
    const doc = new GoogleSpreadsheet('1NCNSIOpLXCKeNXBn_IqqPLhZWyT1S8YSVdPngan-oEw');
    await doc.useServiceAccountAuth(creds);
    let info=await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const consulta=await sheet.getRows();
    let isRegister=0;
    let index=0;
    consulta.forEach( (data,i)=>{
        if(data.Usuario===user){
            isRegister=1;
            index=i;
        }
    });
    if(isRegister==0){
        return [0,0];
    }
    else{
        
        if(consulta[index].Contraseña==password){
            return [1,index];
        }
        else{
            return [2,0];
        }
    }
}
controller.ValidateSingIn=(req,res)=>{
    let user=req.body.usuario;
    let password=req.body.pass;
    
    Validate(user,password).then(data=>{
        res.send({respuesta: data[0],id:data[1]});
    })
}

controller.GoToSelect= (req,res)=>{
    
    let id= req.params.id;
    res.render("Ventana_Select");
    res.send({id:id});
}
async function ValidateCaps(user,names,filtro){
    const doc = new GoogleSpreadsheet('1NCNSIOpLXCKeNXBn_IqqPLhZWyT1S8YSVdPngan-oEw');
        await doc.useServiceAccountAuth(creds);
        let info=await doc.loadInfo();
        var sheet = await doc.sheetsByIndex[0];
        var consulta=await sheet.getRows();
        var cargo=consulta[user].Cargo;
        var user=consulta[user].Usuario;
        console.log(cargo)
        var nn=[]

        for(let i=0;i<names.length;i++){
            if(filtro[i].indexOf(cargo)>=0 || filtro[i][0]=='todos' ){
                nn.push(names[i]);
            }
            
        }
        
        var capsNoA=[];
        
        for (const name of nn){
            
            sheet = await doc.sheetsByTitle[name];
            consulta=await sheet.getRows();
            var isAlready=0;
            for (const fila of consulta){
                if(fila.Usuario==user){
                    isAlready=1;
                }
            }
            if(isAlready==0){
                capsNoA.push(name);
            }

        }
         
        return(capsNoA);
    }
controller.GetTablesNames= (req,res)=>{
    
    var ID= req.params.id;

    var names=[]
    var cap=[]
    var disponibles=[]
    req.getConnection((err,conn)=>{

        conn.query('SELECT * FROM disponibles',(err,rows)=>{
            if (err) throw err;
            
                rows.forEach(row => {
                    cap.push(row.nombre);
                    let temp=row.cargos.split(',');
                    disponibles.push(temp);
                });
                
            
            
            ValidateCaps(ID,cap,disponibles).then(capacitaciones=>{
                console.log(capacitaciones);
                res.send({
                    names :capacitaciones,
                    id: ID});
            })
            
        })
    })
}

controller.GetTestData=(req,res)=>{
    let id= req.params.id;
    let name=req.params.table;
    req.getConnection((err,conn)=>{
        let sql=
        conn.query(`SELECT * FROM ${name}`,(err,rows)=>{
            
            res.send({
                
                id: id,
                videoName:name,
                testData:rows
        });
        })
    })
    
}

async function UpdateData(index,score,tablaN){
    
    const doc = new GoogleSpreadsheet('1NCNSIOpLXCKeNXBn_IqqPLhZWyT1S8YSVdPngan-oEw');
    await doc.useServiceAccountAuth(creds);
    let info=await doc.loadInfo();
    const sheetU = doc.sheetsByIndex[0];
    const consultaU=await sheetU.getRows();
    const sheetR = doc.sheetsByTitle[tablaN];
    const consultaR=await sheetR.getRows();
    await sheetR.addRow({Usuario: consultaU[index].Usuario,Nombre:consultaU[index].Nombre,
        Sede:consultaU[index].Sede,Cargo:consultaU[index].Cargo,Puntuacion: score,Fecha:new Date()})

}

controller.LoadScore=(req,res)=>{
    data=req.body;
    UpdateData(parseInt(data.id),data.score,data.tabla);
    res.send("Su respuestas se han registrado con exito");
}

async function ValidateU(user){
    const doc = new GoogleSpreadsheet('1NCNSIOpLXCKeNXBn_IqqPLhZWyT1S8YSVdPngan-oEw');
    await doc.useServiceAccountAuth(creds);
    let info=await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const consulta=await sheet.getRows();
    let isRegister=0;
    let index=0;
    consulta.forEach( (data,i)=>{
        if(data.Usuario===user){
            isRegister=1;
            index=i;
        }
    });
    return isRegister;
}

async function AddUser(data){
    const doc = new GoogleSpreadsheet('1NCNSIOpLXCKeNXBn_IqqPLhZWyT1S8YSVdPngan-oEw');
    await doc.useServiceAccountAuth(creds);
    let info=await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    sheet.addRow({Usuario: data.usuario,Contraseña:data.pass,Nombre:data.nombre,
    Sede: data.sede,Cargo:data.cargo,Servicio:data.servicio});

}

controller.CreateU=(req,res)=>{
    let data=req.body;
    console.log(data);
    ValidateU(data.usuario).then(R=>{
        if(R==1){
            res.send("Nombre de usuario ya registrado");
        }
        else{
            AddUser(data).then( ()=>{res.send("Usuario registrado con exito")});
        }
    })
    
}

controller.AddVideo=(req,res)=>{

    res.send("El video se cargo con exito");
}

async function AddUTable(name){
    const doc = new GoogleSpreadsheet('1NCNSIOpLXCKeNXBn_IqqPLhZWyT1S8YSVdPngan-oEw');
    await doc.useServiceAccountAuth(creds);
    let info=await doc.loadInfo();
    await doc.addSheet({ title: name, headerValues:['Usuario','Nombre', 'Sede',	'Cargo','Puntuacion','Fecha'] });

}
controller.UploadDB=(req,res)=>{
    var name=req.body.name;
    var datos=[];
    db=req.body.DB.preguntas;
    
    db.forEach( data=>{
        let arr=[data.pregunta].concat(data.respuestas,[data.res]);
        datos.push(arr);
    })
    
    
    var sql = `CREATE TABLE ${name} (id int NOT NULL AUTO_INCREMENT, 
        pregunta varchar(1000) NOT NULL,
        respuesta1 varchar(1000) NOT NULL,
        respuesta2 varchar(1000) NOT NULL,
        respuesta3 varchar(1000) NOT NULL,
        respuesta4 varchar(1000) NOT NULL,
        respuesta int NOT NULL,
        PRIMARY KEY (id))`;
    
        req.getConnection((err,conn)=>{

            conn.query(sql,  (err, result) =>{
                if (err){res.send("Nombre de base de datos ya utilizada");}
                console.log("Table created");
                let sql2=`INSERT INTO ${name} (pregunta,respuesta1,respuesta2,respuesta3,respuesta4,respuesta) VALUES ?`;
                conn.query(sql2,[datos],(err,result)=>{
                    console.log(result.affectedRows);
                    if (err){res.send("No se logro crear la base de datos"); throw(err)};
                    AddUTable(name).then(()=>{res.send("La base de datos se creo correctamente")}
    
                    )
                    ;
                })
              });
            
              conn.query(`INSERT INTO disponibles (nombre, cargos) VALUES ('${name}', '${req.body.cargos}');`,(err,result)=>{
                  if(err)throw(err);
                console.log(result.affectedRows);
              })
    
        })
        
}



module.exports = controller;