import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import "./AllProblems.css"
import { backendUrl } from "../../constants.js";

const AllProblemsPage = () => {
  const [problems, setProblems] = useState([]);

  const init = async () => {
    const response = await fetch(`${backendUrl}/problems`, {
      method: "GET",
    });

    const json = await response.json();
    setProblems(json.problems);
  }

  useEffect(() => {
    init()
  }, []);
  // problemModel.find().then(
  //   (err, problems) => {
  //     if (err) {
  //       res.status(500).send(err);
  //       }
  //       else {
  //         const filteredProblems = problems.map((x) => ({
  //           problemId: x.problemId,
  //           difficulty: x.difficulty,
  //           acceptance: x.acceptance,
  //           title: x.title,
  //         })
          
  // )
  //       }
        
  //     }
  // )

  return (
    <div id="allproblems">
      <table>
        <tbody>

          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Difficulty</th>
            {/* <th>Acceptance</th> */}
          </tr>

          {problems.map((prob) => (
            <tr key={prob.problemId}>
              <td className={`${prob.problemId}`} >{prob.problemId}</td>
              <Link to={`/problems/:${prob.problemId}`}>
                <td>{prob.title}</td>
              </Link>
              <td className={`${prob.difficulty}`} >{prob.difficulty}</td>
              {/* <td>{prob.acceptance}</td> */}
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default AllProblemsPage