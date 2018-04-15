import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      book:'',
      items: []
    
    }
    this.onChange=this.onChange.bind(this);
    this.save=this.save.bind(this);
    this.get=this.get.bind(this);

  }

  onChange (e) {
    
    this.setState({
      book: e.target.value
    });
  }


  save() {
    //console.log(this.state.book)
   var x= this;
    $.ajax({
      type: 'POST',
      data: {book:x.state.book} ,
      url: '/items',
      success: function(data){
        alert('success')
        //console.log(data)
      x.setState({book:data})
      },
      error: function(){
        alert('error')
      }
      // this.setState({'repos:props.data})

    })
  }
 get() {
    //console.log(this.state.book)
   var x= this;
    $.ajax({
      type: 'GET',
    
      url: '/items',
      success: function(data){
        
        x.state.items.push(data)
        console.log(x.state.items)
        var arr=[]
        for (var i = 0; i < data.length; i++) {
          if(data[i].name){
          arr.push(data[i].name)}
        }
        alert(JSON.stringify(arr))
      },
      error: function(){
        alert('error')
      }
      // this.setState({'repos:props.data})

    })
  }

  render () {
    return (<div>
      <h1>Book list</h1>
      <List items={this.state.items}/>
      <input  value={this.state.book} onChange={this.onChange}/>
      <button onClick={this.save}>save  </button>
      <button onClick={this.get}>Get </button>

      
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));