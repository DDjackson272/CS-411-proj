import React, {Component} from 'react';

export default class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            img: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
            .then((flag) => console.log(flag))
    };

    render(){
        const {email, username, password, img} = this.state;
        const {heading, buttonText, signUp} = this.props;
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            <label htmlFor={"email"}>Email:</label>
                            <input className="form-control"
                                   id={"email"}
                                   name="email"
                                   type={"email"}
                                   value={email}
                                   onChange={this.handleChange}
                            />
                            <label htmlFor={"password"}>Password:</label>
                            <input className="form-control"
                                   id={"password"}
                                   name="password"
                                   type={"password"}
                                   onChange={this.handleChange}
                            />
                            {signUp && (
                                <div>
                                    <label htmlFor={"username"}>Username:</label>
                                    <input className="form-control"
                                           id={"username"}
                                           name="username"
                                           type={"text"}
                                           value={username}
                                           onChange={this.handleChange}
                                    />
                                    <label htmlFor={"img"}>Profile Image Url:</label>
                                    <input className="form-control"
                                           id={"img"}
                                           name="img"
                                           type={"text"}
                                           value={img}
                                           onChange={this.handleChange}
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className={"btn btn-primary btn-lg btn-block"}
                                style={{"marginTop": 15}}
                            >
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
