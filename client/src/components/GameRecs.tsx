// import React from 'react';
import { useState, useEffect } from 'react';
import { getRec } from '../api/gemini';

interface GameRec {
    title: string,
    summary: string
}

//TESTING ARRAYS
// const testGames = ['Bloons Tower Defense 4', 'Silent Hill', 'Apex Legends'];

//DIALOGUE ARRAYS
const greetingArray = ['Awesome Picks! You should check these out!', 'Hmm... let me think... what about these?', 'You sure know your games! Have you tried these?']

// VARIABLES

//FORMAT REC INTO CARD

function renderRecs(gameRec: GameRec) {
    const title = gameRec.title
    const summary = gameRec.summary

    return (
        <>
            <div className="card">
                <div>
                    {title}
                </div>
                <section className="content">
                    {summary}
                </section>
            </div>
        </>
    );
    // return '';
}

//FORMAT CARDS INTO MODULE

function GameRecsModule(gameRecsArray: GameRec[]) {
    let module: JSX.Element[] = [];
    for (let i = 0; i < gameRecsArray.length; i++) {
        const newCard = renderRecs(gameRecsArray[i]);
        module.push(newCard);
    }
    return module;
}


function GameRecs(rec: GameRec[], greeting: string) {

    const gameRecsMod = GameRecsModule(rec);

    return (
        <section className='recs'>
            <h2>{greeting}</h2>
            <div className='recsModule'>{gameRecsMod}</div>
        </section>
    )
}

//REC MODAL PANEL

// const [recPanel, setrecPanel] = useState(false);

// function RecPanelButton() {
//     const [expandText, setexpandText] = useState(0);
//     const text = ['Get Suggestions', 'Get Another']

//     const handleSubmit = (e: any) => {
//         e.preventDefault();

//         if (!recPanel) {
//             setrecPanel(true);
//             setexpandText(1);
//         } else {
//             setrecPanel(false);
//             setexpandText(0);
//         };
//     }

//     return(
//     <button onSubmit={handleSubmit}>{text[expandText]}</button>
// )
// }


const RecsPanel: React.FC = () => {

    const [recSection, setRecSection] = useState<JSX.Element>(<>''</>);
    const [renderIndex, setRenderIndex] = useState<Boolean>(false);
    const [renderRec, setRenderRec] = useState<Boolean>(false);
    const [rec, setRec] = useState<GameRec[]>([]);
    const [greeting, setGreeting] = useState<string>('');



    useEffect(() => {
        if (renderRec === false) {
            getRec().then((result) => {
                setRec(result)
            })
            setRenderRec(true);
        }
    }, []);

    useEffect(() => {
        if (renderIndex === false) {
            const randomIndex = Math.floor(Math.random() * greetingArray.length);
            setGreeting(greetingArray[randomIndex]);
            setRenderIndex(true);
        }
    }, []);

    useEffect(() => {
        setRecSection(GameRecs(rec, greeting));
    }, []);

    return (
        <section className='RecsPanel'>
            {/* <RecPanelButton /> */}
            {recSection}
        </section>
    )
};

export default RecsPanel;