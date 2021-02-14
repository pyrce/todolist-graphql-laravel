import React, {Component} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../../css/app.css';   
import AssignmentIcon from '@material-ui/icons/Assignment';
import { CardHeader,Card ,CardContent,Select,MenuItem ,CardActions   } from '@material-ui/core';

class Todolists extends Component {
    constructor() {
        super();
        this.state = {listes:[],id: "", titre: "", deadline: "",description:"",priorites:{id:"",libelle:""},show: false,edit:false,add:false};
        this.getPostes=this.getPostes.bind(this);
        this.viewTache=this.viewTache.bind(this);
        this.editTache=this.editTache.bind(this);
        this.onChange=this.onChange.bind(this);
        this.update=this.update.bind(this);
        this.addTache=this.addTache.bind(this);
        this.add=this.add.bind(this);
        this.modif=this.modif.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.closeEdit=this.closeEdit.bind(this);
        this.filtre=this.filtre.bind(this);
        this.terminer=this.terminer.bind(this);
    }
    
    componentDidMount() {
        this.getPostes();
    }
    
    getPostes(e) {
        console.log("gert poste")
        axios.post('/graphql', {
            query: `
            {
                Todolists{
                    id
                    titre
                    etat
                }
            }
        `
          }).then(postes => {

           var t=Object.keys(postes.data.data).map((key) => postes.data.data[key]);
           this.setState({ listes: t[0]})
           
       })
    }

viewTache(e){

    axios.post('/graphql', {
        query: `
        {
            Todolist(id:${e.target.dataset.id}) {
                id
                titre
                deadline
                description
                priorites{
                    id
                    libelle
                  }
            }
        }
    `
      }).then(postes => {
         
this.setState({
    id:postes.data.data.Todolist.id,
    titre:postes.data.data.Todolist.titre,
    deadline:postes.data.data.Todolist.deadline,
    description:postes.data.data.Todolist.description,
    priorites:postes.data.data.Todolist.priorites
})
       
   })
   this.setState({ show: true });
}

editTache(e){
    axios.post('/graphql', {
        query: `
        {
            Todolist(id:${e.target.dataset.id}) {
                id
                titre
                deadline
                description
                priorites{
                    id
                    libelle
                  }
            }
        }
    `
      }).then(postes => {
          console.log(postes)
          this.setState({
            id:postes.data.data.Todolist.id,
            titre:postes.data.data.Todolist.titre,
            deadline:postes.data.data.Todolist.deadline,
            description:postes.data.data.Todolist.description,
            priorites:postes.data.data.Todolist.priorites
        })
       
   })
   this.setState({ edit: true });
}
handleChange(){

}
update(){
    axios.post('/graphql', {
        query: `
        mutation {
            updateTodo(
              id: ` + this.state.id + `
              titre: "` + this.state.titre + `"
              description: "` + this.state.description + `"
              deadline: "` + this.state.deadline + `"
              etat: false
              priorite_id: ` + this.state.priorites.id + `
            ) {
                  id
                  titre
                  description
                  deadline
                  etat
                  priorites {
                    id
                    libelle
                  }
            }
        }
    `
      }).then(postes => {
        this.setState({ edit: false });
this.getPostes()
       
   })
}
  closeModal ()  {
    this.setState({ show: false });
  };
  addTache(){
    this.setState({ add: true });
  }
  closeEdit(){
    this.setState({ edit: false });
  }

terminer(e){
     axios.post('/graphql', {
        query: `
            mutation {
                updateTodoCheck(
                    id : ` + this.state.id + `
                    etat: true
                ) {
                      id
                      titre
                      description
                      deadline
                      etat
                      priorites {
                        id
                        libelle
                      }
                }
            }
        `
      }).then(()=>{
          this.setState({show:false})
          this.getPostes()
      })

}

modif(e){
    this.setState({show:false});
    this.setState({edit:true});
}

  filtre=e=>{
    let value = e.target.value
    axios.post( 
    "/graphql", {
        query: `
        {

            todos_priorite(priorite_id:`+value+`) {
                id
                titre
                deadline
                description
                etat
                priorites{
                    id 
                    libelle
                  }
            }
        }
   `
     } ).then(postes => {
          console.log(postes)
          var t=Object.keys(postes.data.data).map((key) => postes.data.data[key]);
          this.setState({ listes: t[0]})
       
   })
  };
  onChange = e => {
    let value = e.target.value
    console.log(value);
    this.setState(prevState => ({
        priorites: {                   // object that we want to update
            ...prevState.jasper,    // keep all other key-value pairs
            id: value       // update the value of specific key
        }
    }))
    };
  
  add(){
    axios.post('/graphql', {
        query: `
        mutation {
            createTodo(
                titre: "` + this.state.titre + `"
                description: "` + this.state.description + `"
                deadline: "` + this.state.deadline + `"
                etat: false
                priorite_id: ` + this.state.priorites.id + `
              
            ) {
                  id
                  titre
                  description
                  deadline
                  etat
                  priorites {
                    id
                    libelle
                  }
            }
        }
      `
      }).then(postes => {
        this.setState({ add: false });
this.getPostes()
       
   }) 
  }
    render() {
        return (
            <div id="liste" className="container-fluid">
                <Modal isOpen={this.state.show} className="mymodal" onRequestClose={this.closeEdit}>
      
                    <Card>
                        <CardHeader title={this.state.titre} />
                        <CardContent >
                            <div>
                                <p>Dead line : {this.state.deadline}</p>
                                <p>Priorite {this.state.priorites.libelle}</p>
                            </div>

                            <div>
                                {this.state.description}
                            </div>
                        </CardContent>
                        <CardActions>
      <button className="btn btn-primary" onClick={this.closeModal}>Close</button>
<button className="btn btn-success" data-id={this.state.id} onClick={this.terminer}>Terminer </button>
<button className="btn btn-info" data-id={this.state.id} onClick={this.modif }>Modifier</button>

    </CardActions>
                    </Card>





                </Modal>

                <Modal isOpen={this.state.edit}  className="mymodal" onRequestClose={this.closeEdit}>
                    

                    <div className="rows">
                        <div className="rows">
                        <div className="cols">
                            <label className="visually-hidden">Titre</label>
                            <input type="text" className="form-control-plaintext" onChange={(e=>{this.setState({titre:e.target.value}) })} id="titre" value={this.state.titre} />
                        </div>
                        <div className="col-4">
                            <label  className="visually-hidden">Deadline</label>
                            <input type="date" className="form-control" id="inputPassword2" value={this.state.deadline} onChange={(e=>{this.setState({deadline:e.target.value}) })} />
                        </div>
                    </div>
                        <div className="rows">
                                <label  className="visually-hidden col">Description</label> <br/>
                                <textarea
                                className="col"
          value={this.state.description}
          rows={5}
          cols={70}
          onChange={(e=>{this.setState({description:e.target.value}) })}
        />
                        </div>
                        <button className="btn btn-primary" onClick={this.update} type="submit">Edit </button>
                        <button className="btn btn-primary"  onClick={this.closeEdit}>close</button>
                    </div>


                </Modal>


                <Modal isOpen={this.state.add}  className="mymodal"  onRequestClose={this.closeEdit}>
                    <button onClick={(e)=>this.setState({add:false})}>close</button>

                    <div className="row g-3">
                        <div className="col-auto">
                            <label className="visually-hidden">Titre</label>
                            <input type="text" className="form-control-plaintext" onChange={(e=>{this.setState({titre:e.target.value}) })} id="titre" />
                        </div>
                        <div className="col-auto">
                            <label className="visually-hidden">Priorite</label>
                            <Select
          labelId="demo-simple-select-label"
          id="select"
          onChange={this.onChange}
        >
          <MenuItem value={1}>Faible</MenuItem>
          <MenuItem value={2}>Moyen</MenuItem>
          <MenuItem value={3}>Fort</MenuItem>
        </Select>
                        </div>
                        <div className="col-auto">
                            <label  className="visually-hidden">Deadline</label>
                            <input type="date" className="form-control" id="inputPassword2"  onChange={(e=>{this.setState({deadline:e.target.value}) })} />
                        </div>
                        <div className="row">
                                <label  className="visually-hidden col-auto">Description</label> <br/>
                                <textarea
                                className="col-auto"
          rows={5}
          cols={70}
          onChange={(e=>{this.setState({description:e.target.value}) })}
        />
                        </div>
                        <button className="btn btn-primary" onClick={this.add} type="submit">Edit </button>
                    </div>


                </Modal>
<button className="btn btn-primary" onClick={this.addTache}>ajout tache</button>
<Select
          labelId="demo-simple-select-label"
          className="select"
          onChange={this.filtre}
        >
          <MenuItem value={1}>Faible</MenuItem>
          <MenuItem value={2}>Moyen</MenuItem>
          <MenuItem value={3}>Fort</MenuItem>
        </Select>
                <ul className="list-group">
                    {this.state.listes.map(l =>
                        <li className={`list-group-item d-flex justify-content-between flex-row ${ l.etat==1 ? 'bg-success' : ''}`}  >
                       <AssignmentIcon/>    {l.titre} 

<span className="d-flex">
                            <button className="btn btn-primary" data-id={l.id} onClick={this.viewTache}>
                                <i className="fas fa-search"></i>
                            </button>
</span>
                        </li>


                    )
                    }
                </ul>
            </div>
)
    }
}
export default Todolists;