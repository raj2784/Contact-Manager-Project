import React from 'react';

class AddContact extends React.Component {
    state = {
        name: "",
        email: "",
    };

    add = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All the field are mandatory!");
            return;
        }

        this.props.addContactHandler(this.state);
        this.setState({ name: "", email: "" });
        this.props.history.push("/");
    };
    render() {
        const { name, email } = this.state;
        return (
            <div className="ui main">
                <h1>Add Contact</h1>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name"
                            value={name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email"
                            value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <div>
                        <br />
                        <button className="ui button black" style={{ width: "100%" }}>ADD</button>
                    </div>
                </form>
            </div>
        );
    };
}

export default AddContact;