

const cargo=['todos','Administrativo','Jefe enfermería','Auxiliar de enfermería','Terapeuta respiratoria','Terapeuta Física',
'Tecnólogo Rayos X','Médico general','Médico especialista','Odontólogo','Auxiliar de odontología',
'Odontólogo especialista','Coordinador de sede','Servicios generales','Auxiliares de laboratorio Clínico',
'Bacterióloga','Ingeniería','Auxiliares de lavandería']
class Item extends React.Component{
    constructor(props){
        super(props);
        this.state={pregunta:'',respuestas:['','','',''],res:0}
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {
        
        let temp=this.state.respuestas;

        if(event.target.id==='Pregunta'){
            this.setState({pregunta:event.target.value})
        }
        else if(event.target.id==='RT1'){
            temp[0]=event.target.value;
            this.setState({respuestas:temp});
        }
        else if(event.target.id==='RT2'){
            temp[1]=event.target.value;
            this.setState({respuestas:temp});
        }
        else if(event.target.id==='RT3'){
            temp[2]=event.target.value;
            this.setState({respuestas:temp});
        }
        else if(event.target.id==='RT4'){
            temp[3]=event.target.value;
            this.setState({respuestas:temp});
        }
        else if(event.target.id==='R1'){
            
            this.setState({res:1});
        }
        else if(event.target.id==='R2'){
            
            this.setState({res:2});
        }
        else if(event.target.id==='R3'){
            
            this.setState({res:3});
        }
        else if(event.target.id==='R4'){
            
            this.setState({res:4});
        }
        
      }

      componentDidUpdate(){
        this.props.UpdateData(this.props.Index,this.state);
      }

    render(){return(

    <div className="container-fluid">
        <div className="row  py-3">
            
            <div className="offset-2 col-8 border">
                <h3 className="text-center"> Pregunta {this.props.Index+1}</h3>


                    <div class="form-group row py-5">
                        <label for="Pregunta" class="col-sm-2 col-form-label">Pregunta:</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" onChange={this.handleChange} id="Pregunta" placeholder="¿Cual es la ...?"/>
                        
                        {this.state.respuestas.map( (data,index)=>{
                            
                            return(<><div class="form-check">
                                <br />
                                <input class="form-check-input" onChange={this.handleChange} type="radio" value={index + 1} id={`R${index + 1}`} name={`respuestas${this.props.Index}`} />
                                <label class="form-check-label" for={`R${index + 1}`}>
                                <input type="text" class="form-control" onChange={this.handleChange} id={`RT${index + 1}`} placeholder="respuesta"/>
                                </label>
                            </div></>)
                        
                    })}

                        </div>
                    </div>

                   

                

            </div>

            


        </div>
    </div>
    )}
}



class App extends React.Component{
    constructor(props){
        super(props);

        this.state={preguntas:[],n_preguntas:0,uploadPercentage:0}

        this.AddQ=()=>{
            let temp=this.state.preguntas;
            temp.push({});
            console.log(temp);
            this.setState({n_preguntas: this.state.n_preguntas+1,preguntas:temp});
            
        }
        this.DissQ=()=>{
            let temp=this.state.preguntas;
            temp.pop()
            console.log(temp);
            this.setState({n_preguntas: (this.state.n_preguntas-1>=0) ? this.state.n_preguntas-1: 0,preguntas:temp})
            
        }

        this.UpdateData=(index,data)=>{
            let temp=this.state.preguntas;
            temp[index]=data;
        }

        this.UpdateDB=()=>{
            const formData = new FormData();
            const nombre= document.getElementById('nombre').value;
            var file=document.getElementById('video').files[0];
            var cargoss=document.getElementsByName('cargos');
            var disponible=''
            cargoss.forEach(dom=>{
                
                if(dom.checked){
                    
                    if(disponible.length==0){
                        disponible+=dom.value;
                    }
                    else{
                        disponible+=','+dom.value;
                    }
                }
            })
            formData.append('video', file, nombre);
            
            const options = {
                onUploadProgress: (progressEvent) => {
                  const {loaded, total} = progressEvent;
                  let percent = Math.floor( (loaded * 100) / total )
                  console.log( `${loaded}kb of ${total}kb | ${percent}%` );
          
                  if( percent < 100 ){
                    this.setState({ uploadPercentage: percent })
                    console.log(percent);
                  }
                },
                headers: window.formData
              }
              axios.post('/AddDB/SenVideo',formData,options).then(response=>{
                alert(response.data);
            axios.post('/AddDB/SenData',{ DB: this.state,name: nombre,cargos:disponible}).then(response=>{
                alert(response.data);
            })
        })
           
            
        }
        
    }

 
    componentDidUpdate(prevProps,PrevState){

    }

    

    render() {  return(
        
        <div className="container-fluid ">
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid ms-auto">
                    
                    <img src="../public/logo.png" alt="" width="10%" class="d-inline-block align-text-top mr-2"/>
                    <h1 class="navbar-text text-center  text-primary text-center my-3" id="titulo">
                        Creación de capacitación
                    </h1>
                    
                </div>
            </nav>
            
            <div className="row py-3">

                <div class="offset-2 col-auto mt-3">
                    <p>
                        Numero de preguntas: 
                    </p>
                </div>

                <div className="col-auto mt-3">
                <button className="px-3 btn btn-outline-primary" onClick={this.DissQ}>-</button> 
                <span className="px-3">{this.state.n_preguntas}</span>
                <button className="btn btn-outline-primary" onClick={this.AddQ}>+</button>
                
                </div>
                <div className=" col-auto mt-3">
                <div class="form-group">
                        <label for="video">Selecione el video</label>
                        <input type="file" class="form-control-file" id="video"/>
                    </div>
                </div>
                <div className="col-auto mt-3">
                <input type="text" class="form-control"  id="nombre" placeholder="Coloque el nombre aqui"/>
                </div>
            </div>

            <div className="row py-3">
            
            <div className="offset-2 col-8"><ReactBootstrap.ProgressBar now={this.state.uploadPercentage} active label={`${this.state.uploadPercentage}%`} /></div>
            </div>

            {this.state.preguntas.map( (_,index)=>{
                return(<Item Index={index} key={index} UpdateData={this.UpdateData}> </Item>)
            })}

            <div className="row mt-5 ">
                <div className="col text-center">
                <button className="btn btn-outline-success w-25 " onClick={this.UpdateDB}>Crear Capacitación</button>
                </div>
                
            </div>

            <div className="row mt-5 ">

                <div className="col-6 offset-3">

                    <div className="row border">
                    <h3 className="text-primary text-center my-4">
                        Selecione a quienes aplica la capacitación
                    </h3>
                    {cargo.map( (data,index)=>{
                        return(
                        
                        <div className="col-12 col-md-4">
                        <div class="form-check" >
                        <input class="form-check-input" type="checkbox" value={data} name="cargos" id={`defaultCheck${index}`}/>
                        <label class="form-check-label" for={`defaultCheck${index}`}>
                          {data}
                        </label>
                      </div>
                      </div>)
                    })}

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

  