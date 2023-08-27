const React = require('react');

class Show extends React.Component{
    render(){
        return(
            <div>
                <h1> 
                    Fruit Show Page 
                </h1>
                The {this.props.fruit.name } is
                 {this.props.fruit.color } and 
                 {this.props.fruit.readyToEat ? ' It is ready to eat! ' : " It is not ready to eat! "}
            </div>
        )
    }
}

module.exports = Show;