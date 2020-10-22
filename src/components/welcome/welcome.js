import React, {Component} from 'react'
import './welcome.scss';

const BUTTONS_MAP = [5, 7, 9];

class ComponentWelcome extends Component {

    static drawCell(sellSize) {
        return Array.apply(null, Array(sellSize * sellSize)).map(() => <span className={`s-cell s-cell--${sellSize}`}/>)
    }

    render () {
        const {selectField} = this.props;

        const button = (fieldSize) => (
            <button className="s-button" onClick={() => selectField(fieldSize)}>
                {ComponentWelcome.drawCell(fieldSize)}
                <span className="s-text">{fieldSize}x{fieldSize}</span>
            </button>
        )

        return (
            <div className="m-welcome">
                <h1>Welcome</h1>
                <h2>to drink Bingo</h2>
                <p>but first of all - choose the field size</p>
                <div className="s-selection">
                    {BUTTONS_MAP.map((fieldSize) => button(fieldSize))}
                </div>
            </div>
        )
    }

}

export default ComponentWelcome
