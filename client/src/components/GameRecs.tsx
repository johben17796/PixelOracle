// import React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import { getRec } from '../api/gemini';

interface GameRec {
    TITLE: string,
    SUMMARY: string
}

//TESTING ARRAYS
// const testGames = ['Bloons Tower Defense 4', 'Silent Hill', 'Apex Legends'];

//DIALOGUE ARRAYS
const greetingArray = ['Awesome Picks! You should check these out!', 'Hmm... let me think... what about these?', 'You sure know your games! Have you tried these?']

// VARIABLES

//FORMAT REC INTO CARD

// function renderRecs(gameRec: GameRec) {
//     const title = gameRec.title
//     const summary = gameRec.summary

//     return (
//         <>
//             <div className="card">
//                 <div>
//                     {title}
//                 </div>
//                 <section className="content">
//                     {summary}
//                 </section>
//             </div>
//         </>
//     );
//     // return '';
// }

//FORMAT CARDS INTO MODULE

// function GameRecsModule(gameRecsArray: GameRec[]) {
//     let module: JSX.Element[] = [];
//     for (let i = 0; i < gameRecsArray.length; i++) {
//         const newCard = renderRecs(gameRecsArray[i]);
//         module.push(newCard);
//     }
//     return module;
// }


function GameRecs(rec: GameRec) {

    // const gameRecsMod = GameRecsModule(rec);

    return (
        <section className='recs'>
            <h2>{rec.TITLE}</h2>
            <p>{rec.SUMMARY}</p>
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

    //render recs and greeting once on page load, then once when the user submits button.

    const [recSection, setRecSection] = useState<JSX.Element>(<>''</>);
    // const [renderIndex, setRenderIndex] = useState<Boolean>(false);
    // const [renderRec, setRenderRec] = useState<Boolean>(false);
    const [rec, setRec] = useState<GameRec>({TITLE: '', SUMMARY: ''});
    const [greeting, setGreeting] = useState<string>('');

    const buttonHandler = (event: FormEvent) => {
        event.preventDefault();
        console.log('Requesting new recommendations.');
        // setRenderIndex(false);
        // console.log('RENDERINDEX');
        // setRenderRec(false);
        // console.log('RENDERREC');

        const randomIndex = Math.floor(Math.random() * greetingArray.length);
        setGreeting(greetingArray[randomIndex]);

        getRec().then((result) => {
            setRec(result)
            const recSection = GameRecs(rec);
            setRecSection(recSection);
        })
    };


    useEffect(() => {
            getRec().then((result) => {
                setRec(result)
                const recSection = GameRecs(rec);
                setRecSection(recSection);
            })
            // setRenderRec(true);
    }, []);

    useEffect(() => {
            const randomIndex = Math.floor(Math.random() * greetingArray.length);
            setGreeting(greetingArray[randomIndex]);
            // setRenderIndex(true);
    }, []);

    return (
        <section className='RecsPanel'>
            {/* <RecPanelButton /> */}
            <h1>{greeting}</h1>
            {recSection}
            <form onSubmit={(event: FormEvent) => buttonHandler(event)}>
                <button type="submit">Get Reccomendations.</button>
            </form>
        </section>
    )
};

export default RecsPanel;