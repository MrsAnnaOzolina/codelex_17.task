import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { FaRegHandPaper, FaRegHandScissors, FaRegHandRock } from "react-icons/fa"
import { SetStateAction, useState } from "react"
import axios from "axios";

type Actions = { 
    rock: string,
    paper: string,
    scissors: string
}

const actions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};

function randomAction() {
    const keys = Object.keys(actions);
    const index = Math.floor(Math.random() * keys.length);
    return keys[index];
}

function calculateWinner(action1:String, action2:String) {
    if (action1 === action2) {
        return 0;
    } else if (actions[action1].includes(action2)) {
        return -1;
    } else if (actions[action2].includes(action1)) {
        return 1;
    }

    // This should never really happen
    return null;
}

function ActionIcon({ action, ...props }) {
    const icons = {
        rock: FaRegHandRock,
        paper: FaRegHandPaper,
        scissors: FaRegHandScissors,

    };
    const Icon = icons[action];
    return <Icon {...props} />;
}

function ActionButton({ action = "rock",
    onActionSelected
}) {
    return (
        <button
            className='outline btn-transparent'
            style={{ marginRight: "10px" }}
            onClick={() => onActionSelected(action)}
        >
            <ActionIcon action={action} size={50} />
        </button>
    );
}

function Player({ name = "Player", score = 0, action = "rock" }) {
    const { t } = useTranslation(["game"]);
    return (
        <div className="content bg-indigo-400 u-shadow-lg u-round-sm">
            <div className='u-flex u-justify-center'>
                <p>{name}
                </p>
            </div>
            <div className='u-flex u-justify-center' >
                {action && <ActionIcon action={action} size={40} />}</div>
            <div className='u-flex u-justify-center'><p style={{ fontSize: "10px" }}>{t("scores")} {score}</p></div>
        </div>
    );
}


function Game() {

    const { t } = useTranslation(["game"]);
    const [playerAction, setPlayerAction] = useState("");
    const [computerAction, setComputerAction] = useState("");

    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [winner, setWinner] = useState(0);

    const [playerName, setPlayerName] = useState(" ");
    const [showNameInput, setShowNameInput] = useState(true);
    const [showGameField, setShowGameField] = useState(false);
    const [showPlayAgain, setPlayAgain] = useState(false);
    const [showResult, setShowResult] = useState("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setShowGameField(true);
        setShowNameInput(false);
    }

    const onActionSelected = (selectedAction: SetStateAction<string>): void => {
        const newComputerAction = randomAction();

        setPlayerAction(selectedAction);
        setComputerAction(newComputerAction);

        const newWinner = calculateWinner(selectedAction, newComputerAction);
        setWinner(newWinner!);
        if (newWinner === -1) {
            setPlayerScore(playerScore + 1);
        } else if (newWinner === 1) {
            setComputerScore(computerScore + 1);
        }
    };


    function ShowWinner({ winner = 0 }) {
        const text = {
            "-1": `${t("youWin")}`,
            "0": `${t("itIsTie")}`,
            "1": `${t("youLoose")}`,
        };

        return (
            //@ts-ignore
            <h4>{text[winner]}</h4>
        )
    }

    const addData = async () => {
        setShowGameField(false);
        // setShowNameInput(true);
        setPlayAgain(true);
        await axios.post("http://localhost:3004/statistic", {
            playerName,
            playerScore,
            computerScore
        });
        if (playerScore > computerScore) {
            setShowResult(`${t("youWon")}`)
        } else if (playerScore < computerScore) {
            setShowResult(`${t("computerWon")}`)
        } else {
            setShowResult(`${t("itIsTie")}`)
        }
    }

    const playAgain = () => {
        setPlayAgain(false);
        setShowGameField(true);
        setPlayerScore(0);
        setComputerScore(0);
    }

    const playAgainFromStart = () => {
        setPlayerScore(0);
        setComputerScore(0);
        setPlayerName("");
        setShowGameField(false);
        setShowNameInput(true);
    }
    return (
        <div >

            {showNameInput &&
                <div className='u-flex u-justify-center'>
                    <div className="hero fullscreen bg-indigo-600">
                        <div className="hero-body">
                            <div className="content">
                                <form onSubmit={handleSubmit}>
                                    <label >
                                        {t("addYourName")}</label>
                                    <input type="text" placeholder={`${t("yourName")}`} maxLength={20!} required onChange={e => { setPlayerName(e.target.value) }} />
                                    <div className='u-flex u-justify-center'>
                                        <button
                                            className='btn-success'
                                            style={{ marginTop: "20px" }}
                                        >
                                            {t("startGame")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {showGameField &&
                <div className='u-flex u-justify-center'>
                    <div className="hero fullscreen bg-indigo-600">
                        <div className="hero-body">
                            <div className="content">
                                <div className='row u-flex u-justify-center'>
                                    <div className='col-6 '>
                                        <Player name={playerName} score={playerScore} action={playerAction} />
                                    </div>
                                    <div className='col-6'>
                                        <Player name={`${t("computer")}`} score={computerScore} action={computerAction} />
                                    </div>
                                </div>
                                <div>
                                    <ActionButton action='rock' onActionSelected={onActionSelected} />
                                    <ActionButton action='scissors' onActionSelected={onActionSelected} />
                                    <ActionButton action='paper' onActionSelected={onActionSelected} />
                                </div>
                                <div
                                    className='u-flex u-justify-center'><ShowWinner winner={winner} />
                                </div>
                                <div className='u-flex u-justify-center'>
                                    <button
                                        className='outline btn-success'
                                        onClick={addData}
                                    >
                                        {t("finishGame")}
                                    </button>
                                </div>
                                <div className='u-flex u-justify-center'>
                                    <button
                                        className='outline btn-success'
                                        onClick={playAgainFromStart}
                                    >
                                        {t("startAgain")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {showPlayAgain &&
                <div className='u-flex u-justify-center'>
                    <div className="hero fullscreen bg-indigo-600">
                        <div className="hero-body">
                            <div className="content">
                                <div><h5
                                >
                                    {showResult}</h5></div>
                                <div className='u-flex u-justify-center'>
                                    <button
                                        className='btn-success'
                                        style={{ marginTop: "20px" }}
                                        onClick={playAgain}
                                    >
                                        {t("playAgain")}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }


        </div>
    )
}

export default Game


