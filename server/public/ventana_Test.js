

class App extends React.Component{
    constructor(props){
        super(props);
        
        this.state={paused:1,pausedBytest:0,p:'',respuestas:['a','v','x','d'],res:0,preguntaAc:1,score:0,hidden:"hidden"};
        
        axios.get(window.location.href+'/data').then(response=>{
            let data=response.data;
            console.log(data.testData);
            this.info={titulo: data.videoName,test: data.testData,n_preguntas:data.testData.length,
            id_User:data.id,time_Step:0,videoDur:0,offset:0}
            let video= document.getElementById('video');
            video.src=`../public/${data.videoName}.mp4`;
            document.getElementById('titulo').innerHTML=`Capacitación: ${this.info.titulo}`
            document.getElementById('indicadorP').innerHTML=`Numero de Preguntas: ${this.info.n_preguntas}`
           
        })
        
        this.GenerateTest=()=>{
            let video= document.getElementById('video');
            if(this.state.pausedBytest==0){
                if(video.currentTime-this.info.offset>=this.info.time_Step*this.state.preguntaAc){
                    this.setState({pausedBytest:1,hidden:""});
                    document.getElementById('formulario').click();
                    
                    
                }
            }
        }
        
        this.ToggleVid=()=>{
            let video= document.getElementById('video');
            
            if(video.currentTime==0){
                
                video.play();
                this.setState({paused:0,pausedBytest:0});
                this.info.videoDur=video.duration*3/4;
                this.info.offset=video.duration*1/4;
                this.info.time_Step=(this.info.videoDur)/this.info.n_preguntas ;
                
                console.log(video.duration);
                console.log(this.info.videoDur);
                console.log(this.info.offset);
                console.log(this.info.time_Step);
                console.log(this.info.time_Step*this.info.n_preguntas+this.info.offset)
                this.LoopFnc=setInterval(this.GenerateTest,300);
                
                

            }
            else{
                
                if(this.state.pausedBytest==0){
                (this.state.paused==0)? this.setState({paused:1}):this.setState({paused:0});
                (this.state.paused==0)? video.play():video.pause();
                }
                else{
                    video.pause();
                }
            }
            
        }

        this.AddScore=()=>{
            //this.state={paused:1,pausedBytest:0,p:'',r1:'',r2:'',r3:'',r4:'',res:0,preguntaAc:1,score:0};
            let respuestas=document.getElementsByName('respuestas');
            
            let temp=this.state.score;

            respuestas.forEach( (data)=>{
                if(data.checked && data.value==this.state.res){
                    this.setState({score: temp+1});
                    console.log("entro");
                }
            })
            this.setState({pausedBytest:0,preguntaAc: this.state.preguntaAc+1,hidden:"hidden" });
            this.ToggleVid();

            
        }
    }

 
    componentDidUpdate(prevProps,PrevState){

        if(PrevState!==null){
            if(PrevState.pausedBytest!==this.state.pausedBytest && this.state.pausedBytest==1 && this.state.preguntaAc<=this.info.n_preguntas){

                    this.setState({ p: this.info.test[this.state.preguntaAc-1].pregunta
                    ,respuestas:[this.info.test[this.state.preguntaAc-1].respuesta1,this.info.test[this.state.preguntaAc-1].respuesta2,
                    this.info.test[this.state.preguntaAc-1].respuesta3,this.info.test[this.state.preguntaAc-1].respuesta4],
                    res:this.info.test[this.state.preguntaAc-1].respuesta})
                this.ToggleVid();

            }
            else if(this.state.preguntaAc>this.info.n_preguntas){
                axios.post('/score',{score:this.state.score,id:this.info.id_User,tabla:this.info.titulo}).then( response=>{
                    alert(response.data)
                })
            }
        }
    }

    

    render(){return(
        <div className="container-fluid "style={{backgroundImage: `url("../public/fondo2.jpg")` ,vh:'100%'}}>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid ms-auto">
                    
                    <img src="../public/logo.png" alt="" width="10%" class="d-inline-block align-text-top mr-2"/>
                    <h1 class="navbar-text text-center  text-primary text-center my-3" id="titulo">
                    </h1>
                    
                </div>
            </nav>
            
            <div className="row vh-100 border">
                <div className="col-12 text-center mt-4">
                    <div className="embed-responsive embed-responsive-21by9">
                        <video className="embed-responsive-item mx-5" alt="Video capacitacion"style={{width:'50%'}} id="video"></video>


                    
                    </div>
                    <div className="container">

                        <div className="row ">

                        <div className=" col-12 px-2 mt-3">
                            <button className="btn btn-outline-primary w-50" onClick={this.ToggleVid}>play/pause</button>
                            </div>

                            <div className=" col-12 px-2 bg-dark mt-3 rounded">
                            <h4 id="indicadorP"className="text-white"></h4>
                            </div>

                            <div className=" col-12 px-2 bg-warning mt-3 rounded">
                            <h4 id="indicadorP"className="text-white">{`Pregunta Actual: ${this.state.preguntaAc}`}</h4>
                            </div>
                            
                            <div className=" col-12 px-2 bg-success mt-3 rounded">
                            <h4 id="indicadorP"className="text-white">{`Puntuación: ${parseInt(100*this.state.score/((this.state.preguntaAc-1)))}%`}</h4>
                            </div>

                            <div className=" col-12 px-2  mt-3 rounded" hidden={this.state.hidden}>
                            <button type="button" id="formulario"class="btn btn-outline-primary w-50" data-bs-toggle="modal" data-bs-target="#myModal" data-backdrop="static" data-keyboard="false">
                                Abrir Pregunta
                                </button>
                            </div>

                        </div>

                    </div>
                    
                </div>
                
            </div>

            <div class="modal" id="myModal">
                <div class="modal-dialog">
                <div class="modal-content">
            
                    

                    <div class="modal-header">
                    <h3 class="modal-title">{this.state.p}</h3>
                    </div>
            
                    
                    <div class="modal-body">
                    <br/>
                        {this.state.respuestas.map( (data,index)=>{
                            if(data!='' && data!=' '){
                                return(<><div class="form-check">
                                    <input class="form-check-input" type="radio" value={index + 1} id={`Q${index + 1}`} name="respuestas" />
                                    <label class="form-check-label" for={`Q${index + 1}`}>
                                        {data}
                                    </label>
                                </div><br /></>)
                            }
                            
                            
                        } )}
                        
                    </div>
            
                    
                    <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{this.AddScore()}}>Confirmar</button>
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

  