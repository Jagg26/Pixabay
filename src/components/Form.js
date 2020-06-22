import React, { useState } from 'react';
import Error from './Error';

const Form = ({setSearch}) => {

    const [term, setTerm] = useState('');
    const [error, setError] = useState(false);

    const searchImage = e => {
        e.preventDefault();

        //Validate
        if(term.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        //Send to the Main Component
        setSearch(term);
    }

    return ( 
        <form
            onSubmit={searchImage}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-contorl-lg"
                        placeholder="Search an image"
                        onChange={ e => setTerm(e.target.value) }
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-success btn-block"
                        value="Search"
                    />
                </div>
            </div>

            {error ? <Error message="Add an existing value" /> : null}
        </form>
     );
}
 
export default Form;