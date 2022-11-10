import React, {useState} from "react";
import data from "../PeriodicTableJSON.json";
import Element from "../Modal/Element";
import "../App.css";

const colorMap = {
    "noble gas": "#FFBC42",
    "alkaline earth metal": "#EC674E",
    "diatomic nonmetal": "#D81159",
    "polyatomic nonmetal": "#FF4500",
    "alkali metal": "#8F2D56",
    "transition metal": "#191970",
    "post-transition metal": "#218380",
    "lanthanide": "#4AABAF",
    "actinide": "#DC143C",
    "metalloid": "#73D2DE",
    "unknown, probably transition metal": "#191970",
    "unknown, probably post-transition metal": "#218380",
    "unknown, probably metalloid": "#73D2DE",
    "unknown, but predicted to be an alkali metal": "#8F2D56",
    "unknown, predicted to be noble gas": "#FFBC42"
};  

const PeriodicTable = () => {

    const [showElementModal, setShowElementModal] = useState(false);
    const [elementData, setElementData] = useState(null);
    const [prevElementData, setPrevElementData] = useState(null);
    const [nextElementData, setNextElementData] = useState(null);

    const handleElementClick = (atomicNo) => {
        const selectedElement = data.elements.filter(
			(element) => element.number === atomicNo
		)[0];
        if(atomicNo > 0){
            const prevElement = data.elements.filter(
                (element) => element.number === (atomicNo - 1)
            )[0];
            setPrevElementData(prevElement);
        }
        if(atomicNo < 120){
            const nextElement = data.elements.filter(
                (element) => element.number === (atomicNo + 1)
            )[0];
            setNextElementData(nextElement);
        }
        setElementData(selectedElement);
        setShowElementModal(true);
        console.log(prevElementData);
        console.log(nextElementData);
    }

    const handleCloseElementModal = () => {
        setShowElementModal(false);
        setElementData(null);
        setNextElementData(null);
        setPrevElementData(null);
    }

    return(
        <div className="periodic-table">
        {
            data.elements.map(element => 
                <div
                    onClick={() => handleElementClick(element.number)}
                    className="element"
                    key={element.name}
                    style={{
                        gridColumn: element.xpos,
                        gridRow: element.ypos,
                        borderColor: colorMap[element.category],
                    }}
                >
                    <strong>{element.symbol}</strong>
                    <small className="number">{element.number}</small>
                    <small className="name">{element.name}</small>
                </div>
            )
        }
            <div className="Lanthanide-series" 
                style={{
                    gridColumn: 3,
                    gridRow: 6,
                }}>
                <p>57-71</p>
                <p>La-Lu</p>
            </div>
            <div className="Actinide-series"
                style={{
                    gridColumn: 3,
                    gridRow: 7,
                }}>
                <p>89-103</p>
                <p>Ac-Lr</p>
            </div>

            {showElementModal && (
                <Element 
                    isOpen={showElementModal}
                    element={elementData}
                    handleClose={handleCloseElementModal}
                />
            )}
        </div>
    )
}

export default PeriodicTable;