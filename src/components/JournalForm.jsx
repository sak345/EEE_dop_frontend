import React, { useEffect, useState } from "react";
import axios from "axios";
import "./form.css";




function Form() {
    const [UniqueId, setUniqueId] = useState("");
    const [Level, setLevel] = useState("");
    const [Authors, setAuthors] = useState("");
    const [Article_Title, setArticle_Title] = useState("");
    const [WebLink, setWebLink] = useState("");
    const [Scopus, setScopus] = useState("");
    const [Web_Of_Sc, setWeb_Of_Sc] = useState("");
    const [formData, setFormData] = useState([]);
    const [PUBMED, setPUBMED] = useState("");

    const [formSubmitted, setFormSubmitted] = useState(false);

    //? FOR PROJECTS RECIEVED FROM get request
    const [data, setData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFormData = {
            UniqueId,
            Level,
            Authors,
            Article_Title,
            WebLink,
            Scopus,
            Web_Of_Sc,
            PUBMED,
        };

        setFormData([...formData, newFormData]);
        setUniqueId("");
        setLevel("");
        setAuthors("");
        setArticle_Title("");
        setWebLink("");
        setScopus("");
        setWeb_Of_Sc("");
        setPUBMED("");

        var myHeaders = new Headers();
        myHeaders.append("Authorsization", localStorage.getItem("Token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            Authors: newFormData.Authors,
            agency_type: newFormData.Level,
            funding_agency: newFormData.UniqueId,
            Article_Title: newFormData.Article_Title,
            submission_date: newFormData.Web_Of_Sc,
            WebLink: newFormData.WebLink,
            Scopus: newFormData.Scopus,
            Web_Of_Sc: newFormData.Web_Of_Sc,
            PUBMED: newFormData.PUBMED,
            status_p: "submitted"
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(process.env.REACT_APP_BACKEND_URL + "paper/create", requestOptions)
            .then((response) => {
                console.log(response.body);
                response.text();
            })
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

        setFormSubmitted(!formSubmitted);
    };

    //? get all projects
    useEffect(() => {

        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_BACKEND_URL + "paper/getall",
            headers: {
                Authorsization: localStorage.getItem("Token"),
            },
        };

        axios
            .request(config)
            .then((response) => {
                setData(response.data.papers);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [formSubmitted]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="UniqueId">Unique Id:</label>
                <input
                    type="text"
                    id="UniqueId"
                    placeholder="Eg: 022RSG001-010"
                    required
                    value={UniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                />

                <label htmlFor="Level">Select Level:</label>
                <select
                    id="Level"
                    required
                    value={Level}
                    onChange={(e) => setLevel(e.target.value)}
                >
                    <option value="National">National</option>
                    <option value="International">International</option>
                </select>

                <label htmlFor="Authors">Authors:</label>
                <input
                    type="text"
                    id="Authors"
                    required
                    value={Authors}
                    onChange={(e) => setAuthors(e.target.value)}
                />

                <label htmlFor="Article_Title">Article_Title:</label>
                <textarea
                    style={{ marginBottom: 10, borderRadius: 8, borderBlockColor: 'lightGrey' }}
                    rows={4}
                    type="text"
                    id="Article_Title"
                    required
                    value={Article_Title}
                    onChange={(e) => setArticle_Title(e.target.value)}
                />

                <label htmlFor="WebLink">WebLink:</label>
                <input
                    style={{ marginBottom: 10, borderRadius: 5, borderWidth: 1.5, borderBlockColor: 'lightGrey' }}
                    type="url"
                    id="WebLink"
                    value={WebLink}
                    onChange={(e) => setWebLink(e.target.value)}
                />

                <label htmlFor="Scopus">Scopus:</label>
                <select
                    type="text"
                    id="Scopus"
                    defaultValue={"yes"}
                    required
                    value={Scopus}
                    onChange={(e) => setScopus(e.target.value)}
                >
                    <option value="yes" selected>YES</option>
                    <option value="no">NO</option>
                </select>

                <label htmlFor="Web_Of_Sc">Web_Of_Sc:</label>
                <select
                    type='text'
                    id="Web_Of_Sc"
                    defaultValue={"yes"}
                    required
                    value={Web_Of_Sc}
                    onChange={(e) => setWeb_Of_Sc(e.target.value)}
                >
                    <option value="yes" selected>YES</option>
                    <option value="no">NO</option>
                </select>

                <label htmlFor="PUBMED">PUBMED:</label>
                <select
                    type='text'
                    id="PUBMED"
                    defaultValue={"no"}
                    required
                    value={PUBMED}
                    onChange={(e) => setPUBMED(e.target.value)}
                >
                    <option value="yes">NO</option>
                    <option value="no">YES</option>
                </select>


                {/* <DateArticle_Titlecker/>  */}

                {/* <label htmlFor="projectstatus">Select Status:</label>
        <select
          id="projectstatus"
          required
          value={projectStatus}
          onChange={(e) => setProjectStatus(e.target.value)}
        >
          <option value="">
            --Please select the current status of the project--
          </option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="submitted">Submitted</option>
        </select> */}

                <button type="submit-1">Submit</button>
            </form>


        </div>
    );
}

export default Form;
