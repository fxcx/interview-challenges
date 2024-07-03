import { useState } from "react"

const recognition = new window.webkitSpeechRecognition();

// alternatis si esta en false una ves que termino de hablar el bot me contestaria al instante
recognition.continuous = false
recognition.lang = 'es-AR'

function App() {
  const [ isRecording, setRecording ] = useState<boolean>(false)
  const [buffer, setBuffer] = useState<string>("")

  function handleStartRecording(){
    setRecording(true)

    recognition.start()

    recognition.addEventListener("result", (event) =>{

      const buffer = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)

      setBuffer(buffer);
    })
  }
  
  function handleEndRecording() {
    setRecording(false)

    recognition.stop()
  }

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <header className="text-xl font-bold leading-[4rem]">
        EntrevistAIdor
      </header>
      <section className="grid place-content-center py-8">
        <button
          className={`h-56 w-56 rounded-full border-4 border-neutral-400 p-2 transition-colors  ${isRecording ? "bg-red-500" : "bg-blue-600"} `}
          onClick={() => setRecording((isRecording) => !isRecording)}
        ></button>
      </section>
      <footer className="text-center leading-[4rem] opacity-70">
        © {new Date().getFullYear()} EntrevistAIdor
      </footer>
    </main>
  )
}

export default App
