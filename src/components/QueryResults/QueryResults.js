import React, { Component } from 'react';
import './style.css';
import OptionsList from "../Options/OptionsList/OptionsList";

export default class QueryResults extends Component {

    renderQueryResult = (queryObj) => {

        if(queryObj !== null && typeof queryObj !== 'undefined') {
            return queryObj.from === 0 ? <li className="result">
                <p className="result-text">
                    Found <span className="highlight">{queryObj.query}</span> in the message &nbsp;
                    <span className="highlight">{queryObj.message}</span> from
                    <span className="highlight"> ChatBot</span>
                </p>
            </li> : <li className="result">
                <p className="result-text">
                    Found <span className="highlight">{queryObj.query}</span> in the message &nbsp;
                    <span className="highlight">{queryObj.message}</span> from
                    <span className="highlight"> You</span>
                </p>
            </li>
        }
    };

    render() {
        return (
            <div>
                <OptionsList name="Search Results" />
                        <ul>
                            {
                                this.renderQueryResult(this.props.results[this.props.index])
                            }
                        </ul>
            </div>
        )
    }
}

