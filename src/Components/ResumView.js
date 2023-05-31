import React from "react";
import { useSelector } from "react-redux";

const ResumeView = () => {
  const resumeData = useSelector((state) => state.resume);

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Resume Preview</h2>
          <div className="row">
            <div className="col-md-6">
              <h3>Name:</h3>
              <p className="card-text">{resumeData.name}</p>
              <h3>Email:</h3>
              <p className="card-text">{resumeData.email}</p>
              <h3>Address:</h3>
              <p className="card-text">{resumeData.address}</p>
            </div>
            <div className="col-md-6">
              <h3>Experiences:</h3>
              {resumeData.experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h5>Company:</h5>
                  <p>{exp.company}</p>
                  <h5>Start Year:</h5>
                  <p>{exp.startYear}</p>
                  <h5>End Year:</h5>
                  <p>{exp.endYear}</p>
                  <h5>Designation:</h5>
                  <p>{exp.designation}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h3>Educations:</h3>
              {resumeData.educations.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h5>Institute:</h5>
                  <p>{edu.institute}</p>
                  <h5>Start Year:</h5>
                  <p>{edu.startYear}</p>
                  <h5>End Year:</h5>
                  <p>{edu.endYear}</p>
                  <h5>Degree:</h5>
                  <p>{edu.degree}</p>
                </div>
              ))}
            </div>
            <div className="col-md-6">
              <h3>Skills:</h3>
              {resumeData.skills.map((skill, index) => (
                <p key={index}>{skill}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeView;
