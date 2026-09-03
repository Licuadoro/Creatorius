import { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [showRunes, setShowRunes] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [typedPoem1, setTypedPoem1] = useState('');
  const [typedPoem2, setTypedPoem2] = useState('');
  const [currentLine1, setCurrentLine1] = useState(0);
  const [currentLine2, setCurrentLine2] = useState(0);
  const [isTyping1, setIsTyping1] = useState(false);
  const [isTyping2, setIsTyping2] = useState(false);

  // Runas nórdicas antiguas que significan: "Creo tu idea con la delicadeza de un dios creando un mundo. ¿Acaso no lo soy?"
  // Estas runas están en Nórdico Antiguo (Old Norse) usando el alfabeto Futhark
  const runesText = "ᚠᚱᛖᚷᚾᚨ ᛁᚦᛖᚨ ᚹᛁᚦ ᚦᛖ ᚦᛖᚾᛖᚱᚾᛖᛋᛋ ᚨᚢ ᚨ ᚷᛟᛞ ᚲᚱᛖᚨᛏᛁᚾᚷ ᚨ ᚹᛟᚱᛚᛞ ᛫ ᛁᛋ ᚦᚨᛏ ᚾᛟᛏ ᚹᚺᚨᛏ ᛁ ᚨᛗ?";
  const titleText = "Háblame de tu idea,\ny será real\nantes de lo que esperas";

  const poem1Lines = [
    "Describe tu proyecto,",
    "y yo lo construyo sin pretextos,",
    "y si me lo pides,",
    "redactaré los textos",
    "e ilustraré los elementos"
  ];

  const poem2Lines = [
    "estoy dispuesto a negociar los precios,",
    "pero ten en cuenta que se hace el trabajo con esfuerzo,",
    "y es el sustento",
    "de un sueño",
    "y de un estudio de videojuegos",
    "que germina como un azafrán entre el asfalto,",
    "como tu idea entre mis manos y el teclado"
  ];

  // Animación de runas a título
  useEffect(() => {
    const runesTimer = setTimeout(() => {
      setShowRunes(false);
      setShowTitle(true);
    }, 3000);

    return () => clearTimeout(runesTimer);
  }, []);

  // Animación de escritura del poema 1
  useEffect(() => {
    if (showTitle && currentLine1 < poem1Lines.length) {
      setIsTyping1(true);
      let charIndex = 0;
      const currentLine = poem1Lines[currentLine1];
      
      const typeInterval = setInterval(() => {
        if (charIndex < currentLine.length) {
          setTypedPoem1(prev => {
            const lines = prev.split('\n');
            lines[currentLine1] = (lines[currentLine1] || '') + currentLine[charIndex];
            return lines.join('\n');
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping1(false);
          setCurrentLine1(prev => prev + 1);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    } else if (currentLine1 >= poem1Lines.length && !isTyping2) {
      setIsTyping2(true);
    }
  }, [showTitle, currentLine1]);

  // Animación de escritura del poema 2
  useEffect(() => {
    if (currentLine1 >= poem1Lines.length && currentLine2 < poem2Lines.length) {
      let charIndex = 0;
      const currentLine = poem2Lines[currentLine2];
      
      const typeInterval = setInterval(() => {
        if (charIndex < currentLine.length) {
          setTypedPoem2(prev => {
            const lines = prev.split('\n');
            lines[currentLine2] = (lines[currentLine2] || '') + currentLine[charIndex];
            return lines.join('\n');
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setCurrentLine2(prev => prev + 1);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }
  }, [currentLine1, currentLine2]);

  return (
    <div className="creatorius-container">
      {/* Import Google Fonts */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=VT323&family=Eater&display=swap');`}
      </style>

      {/* Animated Background Pattern */}
      <div className="background-pattern"></div>

      {/* Main Content */}
      <div className="main-content">
        {/* Title Section with Runes Animation */}
        <div className="title-section">
          {showRunes && (
            <h1 className="runes-text animate-runes">
              {runesText}
            </h1>
          )}
          {showTitle && (
            <h1 className="main-title animate-fade-in">
              Háblame de tu idea,<br />
              y será real<br />
              antes de lo que esperas
            </h1>
          )}
        </div>

        {/* Poem Section - Two Columns */}
        <div className="poem-container">
          {/* First Stanza */}
          <div className="poem-column poem-column-1">
            {poem1Lines.map((line, index) => (
              <p key={index} className={`poem-line ${index < currentLine1 ? 'visible' : ''}`}>
                {typedPoem1[index] || ''}
                {index === currentLine1 - 1 && isTyping1 && <span className="cursor">|</span>}
              </p>
            ))}
          </div>

          {/* Second Stanza */}
          <div className="poem-column poem-column-2">
            {poem2Lines.map((line, index) => (
              <p key={index} className={`poem-line ${index < currentLine2 ? 'visible' : ''}`}>
                {typedPoem2[index] || ''}
                {index === currentLine2 - 1 && currentLine1 >= poem1Lines.length && <span className="cursor">|</span>}
              </p>
            ))}
          </div>
        </div>

        {/* ID Card */}
        <div className="card-container">
          <a href="https://licuado.netlify.app" target="_blank" rel="noopener noreferrer" className="id-card-link">
            <div className="id-card">
              <div className="card-header">
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbwhRnXPvUxggOGE4t5RFCC0CLWuAj7shFk4dxvgB0PHMjSg5dw-lVElDkyEGh0gN6PiFT_uDTPxnYS-j9gJcmmlmBR8FM9ohUgXRA4gHWcPNejaHUk9W3LW440ZMsBOFVS2LBsIpms5YmdnPIEUpG0YI8-EsoKxyay7XrckorCDjCbztBfDW0o3eHAss/s1600/1000068010.png" 
                  alt="Licuadoro"
                  className="profile-photo"
                />
                <div className="name-section">
                  <h2 className="card-name">Licuadoro</h2>
                  <p className="card-desde">desde</p>
                </div>
              </div>
              
              {/* LICUADO Logo - Full Width */}
              <div className="logo-section">
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEig4A61ubaXudlMBf9SCPqveobOArRzeOSa6fRRhyphenhyphenC5XGYQ5hrRTpgGwaHqF1v6BjcV1SgqI4llf1S_Q5cODBbVJfAHlURs1FQpQPRkrU8RypzgS6K6FYtFFBnuDsMYHyyrFS9oMAQMGxhWrCxkSXY55QcUuvsEnsQ5BIj-YY4pxMm6bboNtuGZNgaoa9M/s1600/1000068819.png" 
                  alt="LICUADO"
                  className="licuado-logo"
                />
              </div>
              
              {/* Description Text */}
              <p className="card-description">
                Soy por ahora, el único miembro de LICUADO, un estudio de videojuegos con más ambición que personal, y esa frase es literal. La cosa es que necesito fondos para hacer despegar este proyecto, ya que mi cuenta bancaria en este momento en que escribo esto está literalmente en 0. Pero no pienso esperar, ni dejar que esta llama se apague, así que por eso te ofrezco este servicio, en el que por dinero te hago una web como tu la quieras, con alta calidad y todo eso.
              </p>
              
              {/* Sello ABIERTO A NEGOCIAR */}
              <div className="negotiation-stamp">
                <p className="stamp-text">ABIERTO A NEGOCIAR</p>
              </div>
              
              {/* Espacio para botón futuro */}
              <div className="button-placeholder"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
