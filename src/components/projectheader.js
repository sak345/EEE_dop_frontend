import { NavLink } from "react-router-dom";

function ProjectHeader() {
    return (

        <header>
            <h1>Project Page</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/submittedproject"><button>Submitted Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/ongoingproject"><button>Ongoing Projects</button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/completedproject"><button>Completed Projects</button></NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    );
  }
  
  export default ProjectHeader;