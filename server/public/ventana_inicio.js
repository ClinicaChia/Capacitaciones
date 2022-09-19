



class App extends React.Component{
    constructor(props){
        super(props);

        this.Validar= ()=>{
            let U=document.getElementById('usuario');
            let P=document.getElementById('contrasena');
            axios.post('/validarInicio',{usuario: U.value,pass: P.value }).then(response=>{
                let val=response.data.respuesta;
                let id=response.data.id;
                console.log(val);
                if(val==0){
                    alert("No se encontro un usuario registrado con la informacion solicitada");
                }
                else if(val==2){
                    alert("Las contraseñas no coinciden");
                }
                else{
                    
                    window.history.pushState({},null, `/SelecionarCapacitacion/${id}`);
                    window.location.reload();
                }

            }).catch(e=>{
                console.log(e)
            })
        }

    
    }



    render(){return(
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-12 col-md-6 d-flex align-items-center">

                    <img className="img-fluid" src="../public/logo.png"></img>
                    
                        
                </div>

                <div className="col-12 col-md-6 bg-primary">
                    <h2 className="text-white text-center mt-10">PLAN DE CAPACITACIONES GESTIÓN ADMINISTRATIVA, AMBIENTE FÍSICO Y GESTIÓN DE LA TECNOLOGÍA</h2>
                    
                    <div class="form-group">
                    <h5 className="text-white  mt-15"><label for="usuario">Usuario</label></h5>
                        <input type="text" class="form-control" id="usuario" placeholder="Ingrese su usuario" required/>
                        
                    </div>

                    <div class="form-group">
                    <h5 className="text-white  mt-5"><label for="contrasena">Contraseña</label></h5>
                        <input type="password" class="form-control" id="contrasena" placeholder="Ingrese su contraseña" required/>
                        
                    </div>

                    <div className="row mt-10">
                        <div className="col-6 text-center">
                            <button className="btn btn-outline-light" onClick={this.Validar}>Iniciar sesión</button>
                        </div>
                        <div className="col-6 text-center">
                            <a type="button" href='/RegistrarUsuario' className="btn btn-outline-light">Registrarse</a>
                        </div>
                        
                    </div>
                    

                </div>

            </div>
        </div>
    )}
}

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );