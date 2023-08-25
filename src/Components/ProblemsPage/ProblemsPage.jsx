import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'


import "./ProblemsPage.css"
import {backendUrl} from "../../constants.js";


const ProblemsPage = () => {
  const [CodeSeg, setCodeSeg] = useState("") ;
  const { pid } = useParams() ;
  const cleanId = pid.substring(1) ;
  const [problem, setProblem] = useState(null);
  const [submission, setSubmission] = useState("");
  const [subs, setSubs] = useState(null);
  const [language, setLanguage] = useState("");
  let examples = [];
  

    const init = async () => {
      const response = await fetch(`${backendUrl}/problem/` + cleanId, {
        method: "GET",
      });

      const json = await response.json();
      const problem = json.problem;
      setProblem(...problem);
      const submissionArray = problem[0].submissions;
      setSubs(submissionArray);
      examples = problem[0].examples;
    }

  useEffect(() => {
    init();
  }, [])
  // console.log(cleanId) ;


  const handleKey = (event) => {
    if (event.key == "Tab"){
      event.preventDefault() ;
      const { selectionStart , selectionEnd , value } = event.target ;
      const val = value.substring(0,selectionStart) + "\t" + value.substring(selectionStart) ;
      event.target.value = val;
      event.target.selectionStart = event.target.selectionEnd = selectionStart+1;
    }
    setCodeSeg(event.target.value) ;
  }

  return (
    <div>

      {
        problem? (
          <>
          <div id="problempage" className='problempage'>

            {/* ----------- */}

<div className="desc">
  
              <div className="ques">
                <h2>{problem.id}. {problem.title}</h2>
                <h3 className={`${problem.difficulty}`}>{problem.difficulty}</h3>
                <h5>Description</h5>
                <p>{problem.description}</p>
                <div className="examples">
                  
                {
                  examples.map((example,index) => (
                    <div key={index}>
                    <p><strong>Example {index+1}</strong></p>
                    <pre><code>Input: {example.input}<br></br>Output: {example.output}</code></pre>
                    </div>
                  ))
                }
                </div>
              </div>

              
  
           {/*  -------------- */}


           <div className='submissions'>
            <table>
        <tbody>

          <tr>
            
            <th>User</th>
            <th>Language</th>
            <th>Result</th>
            <th>Submission Time</th>
          </tr>

          { subs.map((sub,index) => (
            <tr key={index}>
              <td> {sub.username}</td>  
                <td> {sub.language} </td>
              <td> {sub.result} </td>
              <td> {sub.submissionDate} </td>
            
            </tr>
          ))}

        </tbody>
      </table>
            </div>
             
</div>
            

   {/* --------------   */}
  
  
  
   <div className="code">
                <h1>Code Here</h1>
                <select id="languages-select" onChange={(e) => {setLanguage(e.target.value)}}>
                  <option value="">Choose one</option>
                  <option value="c++">C++</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="rust">Rust</option>
                </select>
                <div className='code-form'>
                  <textarea  onChange={(e) => setSubmission(e.target.value)} name="SolvedCode" onKeyDown={ (event) => handleKey(event) }></textarea>
                  <button type="submit" id="submit" onClick={async () => {
                    
                    if(language.length === 0){
                      alert("Please select a language");
                      return;
                    }
                    if(submission.length === 0){
                      alert("Please enter code");
                      return;
                    }
                    const response = await fetch(`${backendUrl}/submission`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("token")
                      },
                      body: JSON.stringify({
                        problemId: cleanId,
                        language:language,
                        submission: submission
                      })
                    });
                    window.location.reload();
                    
                  }}>SubmitCode</button>
                </div>
              </div>
           
          </div>

        </>

        ) :
        (<div>The searched Question Doesn't exist</div>)
      }

    </div>
    
  )
}

export default ProblemsPage