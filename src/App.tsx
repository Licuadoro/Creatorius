import { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [typedPoem1, setTypedPoem1] = useState<string[]>([]);
  const [typedPoem2, setTypedPoem2] = useState<string[]>([]);
  const [currentLine1, setCurrentLine1] = useState(0);
  const [currentLine2, setCurrentLine2] = useState(0);
  const [isTyping1, setIsTyping1] = useState(false);
  const [isTyping2, setIsTyping2] = useState(false);
  
  // Texto final exacto dividido en 4 líneas fijas - este es el texto al que se transformarán las runas
  // Cada línea es independiente para garantizar exactamente 4 líneas en cualquier pantalla
  const finalTextLines = [
    "¿Tienes una idea?",
    "Hábla conmigo",
    "y será real antes",
    "de lo que esperas."
  ];
  
  // Estado para la animación de transformación de runas a texto
  const [transformedChars, setTransformedChars] = useState<string[]>([]);
  const [isTransforming, setIsTransforming] = useState(true);
  
  // Mapeo EXACTO carácter por carácter del texto final a runas
  // Texto: 4 líneas separadas
  const runeMapping: string[] = [
    // Línea 1: "¿Tienes una idea?" (17 caracteres)
    'ᛉ',  // ¿
    'ᛏ',  // T
    'ᛁ',  // i
    'ᛖ',  // e
    'ᚾ',  // n
    'ᛖ',  // e
    'ᛋ',  // s
    ' ',  // espacio
    'ᚢ',  // u
    'ᚾ',  // n
    'ᚨ',  // a
    ' ',  // espacio
    'ᛁ',  // i
    'ᛞ',  // d
    'ᛖ',  // e
    'ᚨ',  // a
    '?',  // ?
    // Salto de línea 1
    '\n',
    // Línea 2: "Hábla conmigo" (13 caracteres)
    'ᚻ',  // H
    'ᚨ',  // á (usamos ᚨ para a/á)
    'ᛒ',  // b
    'ᛚ',  // l
    'ᚨ',  // a
    ' ',  // espacio
    'ᚲ',  // c
    'ᛟ',  // o
    'ᚾ',  // n
    'ᛗ',  // m
    'ᛁ',  // i
    'ᚷ',  // g
    'ᛟ',  // o
    // Salto de línea 2
    '\n',
    // Línea 3: "y será real antes" (17 caracteres)
    'ᚤ',  // y
    ' ',  // espacio
    'ᛋ',  // s
    'ᛖ',  // e
    'ᚱ',  // r
    'ᚨ',  // á (usamos ᚨ para a/á)
    ' ',  // espacio
    'ᚱ',  // r
    'ᛖ',  // e
    'ᚨ',  // a
    'ᛚ',  // l
    ' ',  // espacio
    'ᚨ',  // a
    'ᚾ',  // n
    'ᛏ',  // t
    'ᛖ',  // e
    'ᛋ',  // s
    // Salto de línea 3
    '\n',
    // Línea 4: "de lo que esperas." (18 caracteres)
    'ᛞ',  // d
    'ᛖ',  // e
    ' ',  // espacio
    'ᛚ',  // l
    'ᛟ',  // o
    ' ',  // espacio
    'ᚦ',  // q
    'ᚢ',  // u
    'ᛖ',  // e
    ' ',  // espacio
    'ᛖ',  // e
    'ᛋ',  // s
    'ᛈ',  // p
    'ᛖ',  // e
    'ᚱ',  // r
    'ᚨ',  // a
    'ᛋ',  // s
    '.'   // .
  ];
  
  // Array pre-calculado con los caracteres finales
  const finalChars = [...finalTextLines.join('\n')];

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

  // Animación de transformación de runas a texto - letra por letra en la misma posición
  useEffect(() => {
    const titleArray = finalChars;
    let currentIndex = 0;
    
    const transformInterval = setInterval(() => {
      if (currentIndex < titleArray.length) {
        setTransformedChars(prev => {
          const newChars = [...prev];
          newChars[currentIndex] = titleArray[currentIndex];
          return newChars;
        });
        currentIndex++;
      } else {
        clearInterval(transformInterval);
        setIsTransforming(false);
        // Asegurar que todos los caracteres estén completamente transformados
        setTransformedChars(titleArray);
      }
    }, 80);

    return () => clearInterval(transformInterval);
  }, []);

  // Animación de escritura del poema 1 - se activa después de la transformación
  useEffect(() => {
    if (isTransforming || currentLine1 >= poem1Lines.length || isTyping1) return;
    
    setIsTyping1(true);
    let charIndex = 0;
    const currentLine = poem1Lines[currentLine1];
    
    const typeInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setTypedPoem1(prev => {
          const newLines = [...prev];
          newLines[currentLine1] = (newLines[currentLine1] || '') + currentLine[charIndex];
          return newLines;
        });
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping1(false);
        setCurrentLine1(prev => prev + 1);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [isTransforming, currentLine1]);

  // Animación de escritura del poema 2
  useEffect(() => {
    if (currentLine1 < poem1Lines.length || currentLine2 >= poem2Lines.length || isTyping2) return;
    
    setIsTyping2(true);
    let charIndex = 0;
    const currentLine = poem2Lines[currentLine2];
    
    const typeInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setTypedPoem2(prev => {
          const newLines = [...prev];
          newLines[currentLine2] = (newLines[currentLine2] || '') + currentLine[charIndex];
          return newLines;
        });
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setCurrentLine2(prev => prev + 1);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentLine1, currentLine2]);

  return (
    <div className="creatorius-container">
      {/* Animated Background Pattern */}
      <div className="background-pattern"></div>

      {/* Main Content - Two Column Layout */}
      <div className="main-content-grid">
        {/* Left Column: Title and Poem */}
        <div className="left-column">
          {/* Title Section with Runes Animation */}
          <div className="title-section">
            <h1 className="runes-text animate-runes">
              {finalTextLines.map((line, lineIndex) => {
                // Calcular el índice global inicial para esta línea
                let globalStartIndex = 0;
                for (let i = 0; i < lineIndex; i++) {
                  globalStartIndex += finalTextLines[i].length;
                }
                
                return (
                  <span key={lineIndex} className="rune-line">
                    {line.split('').map((char, charIndex) => {
                      const globalIndex = globalStartIndex + charIndex;
                      return (
                        <span 
                          key={charIndex} 
                          className={`rune-char ${transformedChars[globalIndex] ? 'transformed' : ''}`}
                          style={{ transitionDelay: `${globalIndex * 80}ms` }}
                        >
                          {transformedChars[globalIndex] !== undefined ? transformedChars[globalIndex] : runeMapping[globalIndex]}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </h1>
          </div>

          {/* Poem Section - Two Columns */}
          <div className="poem-container">
            {/* First Stanza */}
            <div className="poem-column poem-column-1">
              {poem1Lines.map((line, index) => (
                <p key={index} className={`poem-line ${index < currentLine1 ? 'visible' : ''}`}>
                  {typedPoem1[index] || ''}
                  {index === currentLine1 && isTyping1 && <span className="cursor">|</span>}
                </p>
              ))}
            </div>

            {/* Second Stanza */}
            <div className="poem-column poem-column-2">
              {poem2Lines.map((line, index) => (
                <p key={index} className={`poem-line ${index < currentLine2 ? 'visible' : ''}`}>
                  {typedPoem2[index] || ''}
                  {index === currentLine2 && currentLine1 >= poem1Lines.length && isTyping2 && <span className="cursor">|</span>}
                </p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column: ID Card */}
        <div className="right-column">
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
                
                {/* Seal - ABIERTO A NEGOCIAR */}
                <div className="seal-section">
                  <div className="negotiable-seal">ABIERTO A NEGOCIAR</div>
                </div>
                
                {/* Button Placeholder */}
                <div className="button-placeholder">
                  {/* Button will be added here later */}
                </div>
                
                {/* Description Text */}
                <p className="card-description">
                  Soy por ahora, el único miembro de LICUADO, un estudio de videojuegos con más ambición que personal, y esa frase es literal. La cosa es que necesito fondos para hacer despegar este proyecto, ya que mi cuenta bancaria en este momento en que escribo esto está literalmente en 0. Pero no pienso esperar, ni dejar que esta llama se apague, así que por eso te ofrezco este servicio, en el que por dinero te hago una web como tu la quieras, con alta calidad y todo eso.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
