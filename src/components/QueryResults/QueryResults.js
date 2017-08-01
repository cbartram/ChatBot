import React, { Component } from 'react';
import './style.css';
import OptionsList from "../Options/OptionsList/OptionsList";

export default class QueryResults extends Component {
    //Add an additionalClass prop to customize this specific style its dirty but it works =/
    render() {
        return (
            <div className="query-results">
                <div className="row">
                    <OptionsList name="Search Results" additionalClass="resize" />
                </div>
                <div className="row bordered-row">
                    <div className="col-md-12">
                        <ul>
                            {
                                this.props.results.map((result, key) => {
                                    return (
                                        <li key={key}>{result}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

