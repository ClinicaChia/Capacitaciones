


const sedes=['Sede Hospitalaria','Rehabilitación Chía','Chía 1','Chía 2','Mosquera','Tenjo','Facatativá','CAD Facatativá',
'Sogamoso','Tunja','Chocontá','Suesca','Zipaquirá 1','Zipaquirá 2','CAD Zipaquirá','Rehabilitación Zipaquirá'];

const cargo=['Administrativo','Jefe enfermería','Auxiliar de enfermería','Terapeuta respiratoria','Terapeuta Física',
'Tecnólogo Rayos X','Médico general','Médico especialista','Odontólogo','Auxiliar de odontología',
'Odontólogo especialista','Coordinador de sede','Servicios generales','Auxiliares de laboratorio Clínico',
'Bacterióloga','Ingeniería','Auxiliares de lavandería']

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={cargo:'Administrativo',sede:'Rehabilitación Chía'};
        this.onSelect1 = this.onSelect1.bind(this);
        this.onSelect2 = this.onSelect2.bind(this);
        
        this.SenData=()=>{

            let data={ usuario:document.getElementById('usuario').value,
        
                       pass:document.getElementById('contrasena').value,

                       sede:this.state.sede,

                       servicio:document.getElementById('servicio').value,

                       cargo:this.state.cargo,

                       nombre:document.getElementById('nombre').value,
                    };
            axios.post('/Register',data).then(response=>{ 
                alert(response.data)
            })


            return false;
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    handleSubmit(e) {
        // Prevents the default behavior, which includes page refreshing
        e.preventDefault();
      
        // Rest of the code for the function
        this.SenData();
    }
    onSelect1(event) {
        var a= event.target.value;
       
        this.setState({sede: a})
        
      }

      onSelect2(event) {
        var a= event.target.value;
       
        this.setState({cargo: a})
        
      }
    render(){return(
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-12 col-md-3 d-flex align-items-center">

                    <img className="img-fluid " width="100%" src="../public/pacod.png"></img>
                    
                        
                </div>

                <div className="col-12 col-md-9 bg-primary">
                    <h2 className="text-white text-center mt-10">REGISTRO NUEVO USUARIO</h2>
                    
                    <form onSubmit={this.handleSubmit}>

                            <div className="row">

                            <div className="col-12 col-md-6">
                                <div class="form-group">
                                <h5 className="text-white  mt-5 mt-md-15"><label for="usuario">Nombre de Usuario</label></h5>
                                    <input type="text" class="form-control" id="usuario" required placeholder="Ingrese un nombre" required/>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div class="form-group">
                                <h5 className="text-white mt-5 mt-md-15"><label for="contrasena">Contraseña</label></h5>
                                    <input type="text" class="form-control" id="contrasena" required placeholder="Ingrese su contraseña" required/>
                                    
                                </div>
                            </div>

                            </div>

                            <div className="row">

                            <div className="col-12 col-md-6">
                                <div class="form-group">
                                <h5 className="text-white  mt-5"><label for="sede">Sede</label></h5>
                                    <select className="form-select"  value={this.state.sede} id='sede' onChange={this.onSelect1} required>
                
                                        { sedes.map(nombre =>{
                                            
                                            return <option value={nombre}>{nombre}</option>
                                        })}
                                        
                                    </select>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div class="form-group">
                                <h5 className="text-white mt-5"><label for="servicio">Servicio</label></h5>
                                    <input type="text" class="form-control" id="servicio" required placeholder="administrativo,cirugia,ingieneria,etc" required/>
                                    
                                </div>
                            </div>

                            </div>

                            <div className="row">

                            <div className="col-12 col-md-6">
                                <div class="form-group">
                                <h5 className="text-white  mt-5"><label for="cargo">Cargo</label></h5>
                                <select className="form-select"  value={this.state.cargo} id='cargi' onChange={this.onSelect2} required>
                                    
                                    { cargo.map(nombre =>{
                                        
                                        return <option value={nombre}>{nombre}</option>
                                    })}
                                    
                                </select>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div class="form-group">
                                <h5 className="text-white mt-5"><label for="nombre">Nombre Completo</label></h5>
                                    <input type="text" class="form-control" id="nombre" required placeholder="Ingrese su nombre completo" required/>
                                    
                                </div>
                            </div>

                            </div>

                            <div className="row">
                            <div className="col">
                                <div class="form-check mt-10">
                                    <input type="checkbox" required class="form-check-input" id="tyc"/>
                                    <label class="form-check-label text-white"  for="tyc">Acepto los terminos y condiciones para el tratamientos de datos por parte de la Clinica Chía S.A.S </label>
                                </div>
                            </div>
                            </div>


                            <div className="row mt-5">
                            <div className="col text-center">
                                <button type="submit" className="btn btn-outline-light w-100" >Registrar</button>
                            </div>

                            <div className="col text-center">
                                <a type="button"href="/" className="btn btn-outline-light w-100" >Volver al inicio</a>
                            </div>

                            </div>


                    </form>
                    
                    
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