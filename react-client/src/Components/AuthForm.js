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
            .then(() => {
                this.props.history.push("/");
            })
            .catch(() => {
                return;
            })
    };

    render(){
        const {email, username, img} = this.state;
        const {heading, buttonText, signUp, errors, history, removeError} = this.props;

        // history.listen, listens to every change in route.
        history.listen(() => {
            removeError();
        });

        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message &&
                                <div className={"alert alert-danger"}>
                                    {errors.message}
                                </div>
                            }
                            <label htmlFor={"email"}>Email:</label>
                            <input className="form-control"
                                   id={"email"}
                                   name="email"
                                   type={"email"}
                                   value={email}
                                   required={true}
                                   onChange={this.handleChange}
                            />
                            <label htmlFor={"password"}>Password:</label>
                            <input className="form-control"
                                   id={"password"}
                                   name="password"
                                   type={"password"}
                                   required={true}
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
                                           required={true}
                                           onChange={this.handleChange}
                                    />
                                    <label htmlFor={"img"}>Profile Image Url:</label>
                                    <input className="form-control"
                                           id={"img"}
                                           name="img"
                                           type={"url"}
                                           value={img}
                                           required={true}
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
