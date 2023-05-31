import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
const ResumeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [experiences, setExperiences] = useState([
    { company: "", startYear: "", endYear: "", designation: "" },
  ]);
  const [educations, setEducations] = useState([
    { institute: "", startYear: "", endYear: "", degree: "" },
  ]);
  const [skills, setSkills] = useState([]);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [experienceErrors, setExperienceErrors] = useState([
    { company: "", year: "", designation: "" },
  ]);
  const [educationErrors, setEducationErrors] = useState([
    { institute: "", year: "", degree: "" },
  ]);
  const [skillsError, setSkillsError] = useState("");

  const handleSkillChange = (tags) => {
    setSkills(tags);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (name === "") {
      setNameError("Please enter your name.");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate email
    if (email === "") {
      setEmailError("Please enter your email.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate address
    if (address === "") {
      setAddressError("Please enter your address.");
      isValid = false;
    } else {
      setAddressError("");
    }

    // Validate experiences
    const updatedExperienceErrors = experiences.map((experience) => {
      const errors = {};
      if (experience.company === "") {
        errors.company = "Please enter the company.";
        isValid = false;
      }
      if (experience.startYear === "") {
        errors.startYear = "Please enter the start year.";
        isValid = false;
      }
      if (experience.endYear === "" && !experience.currently) {
        errors.endYear = "Please enter the end year.";
        isValid = false;
      }
      if (experience.designation === "") {
        errors.designation = "Please enter the designation.";
        isValid = false;
      }
      return errors;
    });
    setExperienceErrors(updatedExperienceErrors);

    // Validate educations
    const updatedEducationErrors = educations.map((education) => {
      const errors = {};
      if (education.institute === "") {
        errors.institute = "Please enter the institute.";
        isValid = false;
      }
      if (education.startYear === "") {
        errors.startYear = "Please enter the year.";
        isValid = false;
      }
      if (education.endYear === "" && !education.currently) {
        errors.endYear = "Please enter the end year.";
        isValid = false;
      }
      if (education.degree === "") {
        errors.degree = "Please enter the degree.";
        isValid = false;
      }
      return errors;
    });
    alert(updatedEducationErrors);
    setEducationErrors(updatedEducationErrors);
    // Validate skills
    if (skills.length === 0) {
      setSkillsError("Please select at least one skill.");
      isValid = false;
    } else {
      setSkillsError("");
    }

    return isValid;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formattedExperiences = experiences.map((exp) => ({
        ...exp,
        startYear: exp.startYear || "",
        endYear: exp.currently ? "Currently" : exp.endYear || "",
      }));

      const formattedEducations = educations.map((edu) => ({
        ...edu,
        startYear: edu.startYear || "",
        endYear: edu.currently ? "Currently" : edu.endYear || "",
      }));

      dispatch({
        type: "SUBMIT_RESUME",
        payload: {
          name,
          email,
          address,
          experiences: formattedExperiences,
          educations: formattedEducations,
          skills,
        },
      });

      setName("");
      setEmail("");
      setAddress("");
      setExperiences([
        { company: "", startYear: "", endYear: "", designation: "" },
      ]);
      setEducations([
        { institute: "", startYear: "", endYear: "", degree: "" },
      ]);
      setSkills([]);
      navigate("/view");
    }
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        startYear: "",
        endYear: "",
        designation: "",
        currently: false,
      },
    ]);
  };

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        institute: "",
        startYear: "",
        endYear: "",
        degree: "",
        currently: false,
      },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExp = [...experiences];
    updatedExp.splice(index, 1);
    setExperiences(updatedExp);
  };

  const handleRemoveEducation = (index) => {
    const updatedEdu = [...educations];
    updatedEdu.splice(index, 1);
    setEducations(updatedEdu);
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>Resume Builder</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <span className="error-message text-danger">{nameError}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <span className="error-message text-danger">{emailError}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {addressError && (
            <span className="error-message text-danger">{addressError}</span>
          )}
        </div>

        <h4>Experiences:</h4>
        {experiences.map((exp, index) => (
          <div key={index} className="form-row">
            <div className="form-group col">
              <label htmlFor={`company-${index}`}>Company:</label>
              <input
                type="text"
                className="form-control"
                id={`company-${index}`}
                value={exp.company}
                onChange={(e) => {
                  const updatedExp = [...experiences];
                  updatedExp[index].company = e.target.value;
                  setExperiences(updatedExp);
                }}
              />
              {experienceErrors.map((error) => (
                <span className="error-message text-danger">
                  {error.company}
                </span>
              ))}
            </div>
            <div className="form-group col">
              <label htmlFor={`designation-${index}`}>Designation:</label>
              <input
                type="text"
                className="form-control"
                id={`designation-${index}`}
                value={exp.designation}
                onChange={(e) => {
                  const updatedExp = [...experiences];
                  updatedExp[index].designation = e.target.value;
                  setExperiences(updatedExp);
                }}
              />
              {experienceErrors.map((error) => (
                <span className="error-message text-danger">
                  {error.designation}
                </span>
              ))}
            </div>

            <div className="form-group col">
              <label htmlFor={`startYear-${index}`}>Start Year:</label>
              <input
                type="text"
                className="form-control"
                id={`startYear-${index}`}
                value={exp.startYear}
                onChange={(e) => {
                  const updatedExp = [...experiences];
                  updatedExp[index].startYear = e.target.value;
                  setExperiences(updatedExp);
                }}
              />
              {experienceErrors.map((error) => (
                <span className="error-message text-danger">
                  {error.startYear}
                </span>
              ))}
            </div>

            <div className="form-group col">
              <label htmlFor={`endYear-${index}`}>End Year:</label>
              <input
                type="text"
                className="form-control"
                id={`endYear-${index}`}
                value={exp.endYear}
                onChange={(e) => {
                  const updatedExp = [...experiences];
                  updatedExp[index].endYear = e.target.value;
                  setExperiences(updatedExp);
                }}
                disabled={exp.currently} 
              />
              {experienceErrors.map((error) => (
                <span className="error-message text-danger">
                  {error.endYear}
                </span>
              ))}
            </div>

            {index === experiences.length - 1 && (
              <div className="form-group  p-2 pr-4 mt-4   ">
                <label htmlFor={`currently-${index}`}>Currently:</label>
                <input
                  type="checkbox"
                  className="form-check-input ml-1 mt-2"
                  id={`currently-${index}`}
                  checked={exp.currently}
                  onChange={(e) => {
                    const updatedExp = [...experiences];
                    updatedExp[index].currently = e.target.checked;
                    setExperiences(updatedExp);
                  }}
                />
              </div>
            )}

            {index > 0 && (
              <div className="form-group  " style={{ marginTop: 30 }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveExperience(index)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAddExperience}
        >
          Add More
        </button>

        <h4 className="mt-2">Educations:</h4>
        {educations.map((edu, index) => (
          <div key={index} className="form-row">
            <div className="form-group col">
              <label htmlFor={`institute-${index}`}>Institute:</label>
              <input
                type="text"
                className="form-control"
                id={`institute-${index}`}
                value={edu.institute}
                onChange={(e) => {
                  const updatedEdu = [...educations];
                  updatedEdu[index].institute = e.target.value;
                  setEducations(updatedEdu);
                }}
              />
              {educationErrors.map((error) => (
                <span className="error-message text-danger">
                  {error.institute}
                </span>
              ))}
            </div>

            <div className="form-group col">
              <label htmlFor={`degree-${index}`}>Degree:</label>
              <input
                type="text"
                className="form-control"
                id={`degree-${index}`}
                value={edu.degree}
                onChange={(e) => {
                  const updatedEdu = [...educations];
                  updatedEdu[index].degree = e.target.value;
                  setEducations(updatedEdu);
                }}
              />
              {educationErrors.map((error) => (
                <span className="error-message text-danger">
                  {error.degree}
                </span>
              ))}
            </div>
            <div className="form-group col">
              <label htmlFor={`startYear-${index}`}>Start Year:</label>
              <input
                type="text"
                className="form-control"
                id={`startYear-${index}`}
                value={edu.startYear}
                onChange={(e) => {
                  const updatedEdu = [...educations];
                  updatedEdu[index].startYear = e.target.value;
                  setEducations(updatedEdu);
                }}
              />
              {educationErrors.map((error) => (
                <span className="error-message text-danger">
                  {error.startYear}
                </span>
              ))}
            </div>
            <div className="form-group col">
              <label htmlFor={`endYear-${index}`}>End Year:</label>
              <input
                type="text"
                className="form-control"
                id={`endYear-${index}`}
                value={edu.endYear}
                onChange={(e) => {
                  const updatedEdu = [...educations];
                  updatedEdu[index].endYear = e.target.value;
                  setEducations(updatedEdu);
                }}
                disabled={edu.currently}
              />
              {educationErrors.map((error) => (
                <span className="error-message text-danger">
                  {error.endYear}
                </span>
              ))}
            </div>

            {index === educations.length - 1 && (
              <div className="form-group p-2 pr-4 mt-4 ">
                <label htmlFor={`currently-${index}`}>Currently:</label>
                <input
                  type="checkbox"
                  className="form-check-input ml-1 mt-2"
                  id={`currently-${index}`}
                  checked={edu.currently}
                  onChange={(e) => {
                    const updatedEdu = [...educations];
                    updatedEdu[index].currently = e.target.checked;
                    setEducations(updatedEdu);
                  }}
                />
              </div>
            )}

            {index > 0 && (
              <div className="form-group " style={{ marginTop: 30 }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveEducation(index)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAddEducation}
        >
          Add More
        </button>

        <h4 className="mt-2">Skills:</h4>
        <div>
          <TagsInput
            value={skills}
            onChange={handleSkillChange}
            inputProps={{
              placeholder: "Add a skill",
            }}
            addOnBlur={true}
            addOnPaste={true}
            addKeys={[9, 13, 32]} // Tab, Enter, Space
            onlyUnique={true}
          />
          {skillsError && (
            <span className="error-message text-danger">{skillsError}</span>
          )}
        </div>
        <div className="  d-flex align-items-center justify-content-center">
          <button type="submit" className="btn btn-primary mt-5 ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
