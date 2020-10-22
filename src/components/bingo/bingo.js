import React, {Component} from 'react'
import './bingo.scss';

import bingoContent from './bingo-content';

class ComponentBingo extends Component {

    state = {
        data: null
    }

    componentDidMount() {
        const {fieldSize} = this.props;

        this.setState(() => ({
            data: this.getCells(fieldSize)
        }));
    }

    getCells(fieldSize) {
        const tempData = [...bingoContent];

        for (let i = tempData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempData[i], tempData[j]] = [tempData[j], tempData[i]];
        }

        const newData = tempData.slice(0, fieldSize * fieldSize);

        return newData.map((item, index) => index === Math.floor(newData.length / 2) ? {
            text: "BINGO :)",
            selected: true
        } : {
            text: item
        });
    }

    selectItem(index) {
        this.setState((prevState) => ({
                data: prevState.data.map((item, i) => index === i ? {...item, selected: true} : item)
            }),
            () => {
                this.validate(index);
            })
    }

    validate(index) {
        const {fieldSize} = this.props;
        const {data} = this.state;
        const a = index % fieldSize;
        const c = Math.floor(index / fieldSize);
        const diagonalType = a === c ? 1 : (a + c + 1 === fieldSize) ? -1 : 0;
        let winItems = [];

        let b = 0;
        let tempWinItems = [];

        const checker = (i) => {
            if (data[i].selected) {
                b++;
                tempWinItems.push(i);
            }
            if (b === fieldSize) {
                winItems = [...new Set([].concat(...[winItems, tempWinItems]))]
            }
        };

        const horizontal = () => {
            b = 0;
            tempWinItems = [];
            for (let i = index - a; i < index + fieldSize - a; i++) {
                checker(i)
            }
        };


        const vertical = () => {
            b = 0;
            tempWinItems = [];
            for (let i = index - c * fieldSize; i < index + (fieldSize - c) * (fieldSize); i = i + fieldSize) {
                checker(i)
            }
        };

        const diagonal = () => {
            b = 0;
            tempWinItems = [];
            for (let i = index - (c * (fieldSize + diagonalType)); i < fieldSize * fieldSize; i = i + fieldSize + diagonalType) {
                checker(i)
            }
        };

        horizontal();
        vertical();
        diagonalType && diagonal();


        winItems.length && this.setState((prevState) => {
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }

            return {
                data: prevState.data.map((item, index) => winItems.includes(index) ? {
                        ...item,
                        explosion: item.explosion ? item.explosion - 1 || 2 : 1
                    } : item
                )
            }
        });
    }

    getItem(item, index, fieldSize) {
        const {selected, explosion} = item;
        return (
            <div className={`s-item s-item--${fieldSize} ${selected ? ' is-selected' : ''}`}
                 onClick={() => !selected && this.selectItem(index)} key={index}>
                <div className="s-item-text">{item.text}</div>
                {explosion && <div className={`s-explosion-t${item.explosion}`} /> }
            </div>
        )
    }

    render() {

        const {fieldSize, reset} = this.props;
        const {data} = this.state;

        return data ? (
            <div className="m-bingo">
                <div className="s-bingo">
                    <div className="s-field">
                        {data.map((item, index) => this.getItem(item, index, fieldSize))}
                    </div>
                </div>

                <div className="s-new-game">
                    <button onClick={reset}>New Game</button>
                </div>
            </div>
        ) : null
    }

}

export default ComponentBingo
