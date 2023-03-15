import Head from 'next/head'
import { useState } from 'react'


export default function Home() {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [converting,setConverting] = useState(false)



  const handleEvent = (e) => {
    e.preventDefault()
    setConverting(true)
    fetch("/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),

    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setOutput(data.output)
        setConverting(false)
      })
      .catch((err) => {
        console.log(err)
        setConverting(false)
      })
  };




  return (
    <>
      <Head>
        <title>CSS Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-800 flex flex-col">
        <div className="flex flex-col min-h-screen gap-12 items-center py-6">
          <div className="flex flex-col align-center border rounded-lg p-3 bg-gray-700  border-gray-700 min-w-min">
            <div className="flex flex-row text-center">
              <h2 className="text-2xl text-white">CSS Generator</h2>
            </div>

          </div>
          <form onSubmit={(event) => {handleEvent(event)}}>
          <div className="flex flex-row align-center min-w-min border-2 rounded-lg border-gray-700
            min-h-min p-3 gap-8 items-center sm:w-1/2 md:w-1/3
          ">{/* input text area div  */}
            
              <input type="text
              " className="bg-white-400 h-full w-42 p-1 sm:w-64 md:w-72
                rounded-md border border-gray-50 text-black" placeholder="Describe your layout"
                onChange={(e) => {
                  setInput(e.target.value)
                }}

                value={input}
                required
               
                />

              <button className="bg-blue-800 h-full min-w-min px-2
                rounded-md border border-gray-50 text-white
              " type="submit">
                {converting ? "Converting..." : "Convert"}
              </button>
            
          </div>
          </form>
          {/* output text area div  */}
          {output &&
          <div className="flex flex-col min-h-min min-w-min p-2 border mx-auto rounded-lg border-gray-700 gap-8">
            <div className="flex flex-row text-center">
              <h2 className="text-xl text-white">CSS Output</h2>
            </div>
            <div className="bg-gray-700 p-2 flex flex-col">
              <code className="text-white" lang="html">
                {output}
              </code>
            </div>

          </div>
          }

        </div>
    
      </main>
    </>
  )
}
