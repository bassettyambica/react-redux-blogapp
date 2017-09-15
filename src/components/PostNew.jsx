import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

//Refer docs: https://redux-form.com/7.0.4/examples/syncvalidation/

class PostNew extends Component {
    renderField (field){
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type="text"
                    {...field.input}
                    className="form-control"
                    placeholder={field.placeholder}
                />
            <div className="text-help">
                {field.meta.touched ? field.meta.error : " "}
            </div>
            </div>
        );
    }
    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push("/");
        });
    }

    render (){
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <h3> Add a new Post</h3>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                    placeholder="title"
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                    placeholder="category"
                />
                <Field
                    label="Content"
                    name="contents"
                    component={this.renderField}
                    placeholder="contents..."
                />
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
};

function validate(values) {
    const errors = {};

    if(!values.title){
        errors.title = "Enter the title";
    }
    if(!values.categories){
        errors.categories = "Enter category";
    }
    if(!values.contents){
        errors.contents = "Enter contents";
    }

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostNew)
);
