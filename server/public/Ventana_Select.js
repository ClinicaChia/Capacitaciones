




class App extends React.Component{
    constructor(props){
        super(props);
        this.state={id:'',capacitaciones:[]};

        this.PostButton=(index)=>{
            
            let id=this.state.id;
            let nombre=this.state.capacitaciones[index];
            window.history.pushState({},null, `/Capacitacion/${id}/${nombre}`);
            window.location.reload();
        }
        
    }

    componentDidMount(){
        
        axios.get(window.location.href+'/datos').then(response=>{
            
            this.setState({id: parseInt(response.data.id),capacitaciones: response.data.names})
        })
    }

   



    render(){return(
        <div className="container-fluid" style={{backgroundImage: `url("../public/fondo2.jpg")` ,vh:'100%'}}>
            
            <h1 className='text-center py-5 text-primary'> Seleccione la capacitacion a realizar</h1>
            <div className='container vh-100 ml-5'>

                <div className="row">

                {this.state.capacitaciones.map( (val,index)=>{
                console.log(val);
                
                return(
                <div className=' col-6 col-md-3 my-3'>
                    <button className="btn btn btn-primary w-100" onClick={()=>{this.PostButton(index)}}>{val}</button>
                </div>
                )
                
                
            })}

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