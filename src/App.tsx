export default function App() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      padding: "2rem", 
      fontFamily: "'Caveat', cursive",
      backgroundColor: "#f5f5f5"
    }}>
      {/* Import Google Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=VT323&display=swap');`}
      </style>

      {/* Main Title */}
      <h1 style={{ 
        fontSize: "3.5rem", 
        textAlign: "center", 
        marginBottom: "3rem",
        lineHeight: 1.2,
        fontWeight: 700
      }}>
        Háblame de tu idea,<br />
        y será real<br />
        antes de lo que esperas
      </h1>

      {/* Poem Section - Two Columns */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "4rem",
        marginBottom: "4rem",
        flexWrap: "wrap"
      }}>
        {/* First Stanza */}
        <div style={{ 
          fontSize: "1.8rem",
          lineHeight: 1.6,
          whiteSpace: "nowrap",
          textAlign: "left"
        }}>
          <p>Describe tu proyecto,</p>
          <p>y yo lo construyo sin pretextos,</p>
          <p>y si me lo pides,</p>
          <p>redactaré los textos</p>
          <p>e ilustraré los elementos</p>
        </div>

        {/* Second Stanza */}
        <div style={{ 
          fontSize: "1.8rem",
          lineHeight: 1.6,
          whiteSpace: "nowrap",
          textAlign: "left"
        }}>
          <p>estoy dispuesto a negociar los precios,</p>
          <p>pero ten en cuenta que se hace el trabajo con esfuerzo,</p>
          <p>y es el sustento</p>
          <p>de un sueño</p>
          <p>y de un estudio de videojuegos</p>
          <p>que germina como un azafrán entre el asfalto,</p>
          <p>como tu idea entre mis manos y el teclado</p>
        </div>
      </div>

      {/* ID Card */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center"
      }}>
        <div style={{ 
          width: "300px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          textAlign: "center",
          fontFamily: "'VT323', monospace",
          fontSize: "1.2rem"
        }}>
          {/* Photo */}
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbwhRnXPvUxggOGE4t5RFCC0CLWuAj7shFk4dxvgB0PHMjSg5dw-lVElDkyEGh0gN6PiFT_uDTPxnYS-j9gJcmmlmBR8FM9ohUgXRA4gHWcPNejaHUk9W3LW440ZMsBOFVS2LBsIpms5YmdnPIEUpG0YI8-EsoKxyay7XrckorCDjCbztBfDW0o3eHAss/s1600/1000068010.png" 
            alt="Licuadoro"
            style={{ 
              width: "150px", 
              height: "150px", 
              objectFit: "contain",
              marginBottom: "1rem"
            }}
          />
          
          {/* Name */}
          <h2 style={{ 
            fontSize: "2rem", 
            margin: "0.5rem 0",
            fontWeight: "bold"
          }}>
            Licuadoro
          </h2>
          
          {/* "desde" text */}
          <p style={{ 
            fontSize: "1.5rem", 
            margin: "0.5rem 0"
          }}>
            desde
          </p>
          
          {/* LICUADO Logo */}
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEig4A61ubaXudlMBf9SCPqveobOArRzeOSa6fRRhyphenhyphenC5XGYQ5hrRTpgGwaHqF1v6BjcV1SgqI4llf1S_Q5cODBbVJfAHlURs1FQpQPRkrU8RypzgS6K6FYtFFBnuDsMYHyyrFS9oMAQMGxhWrCxkSXY55QcUuvsEnsQ5BIj-YY4pxMm6bboNtuGZNgaoa9M/s1600/1000068819.png" 
            alt="LICUADO"
            style={{ 
              width: "120px", 
              height: "auto",
              marginBottom: "1rem"
            }}
          />
          
          {/* Description Text */}
          <p style={{ 
            fontSize: "1.1rem",
            lineHeight: 1.4,
            textAlign: "justify"
          }}>
            Soy por ahora, el único miembro de LICUADO, un estudio de videojuegos con más ambición que personal, y esa frase es literal. La cosa es que necesito fondos para hacer despegar este proyecto, ya que mi cuenta bancaria en este momento en que escribo esto está literalmente en 0. Pero no pienso esperar, ni dejar que esta llama se apague, así que por eso te ofrezco este servicio, en el que por dinero te hago una web como tu la quieras, con alta calidad y todo eso.
          </p>
        </div>
      </div>
    </div>
  );
}
