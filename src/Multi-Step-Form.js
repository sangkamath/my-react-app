import logo from './logo.svg';
import './App.css';
import { useState, createContext, useContext, useEffect, useRef, useMemo, useReducer, useCallback } from "react";

const StepOne = ({ data, onChange, onNext }) => {

  return (
    <div>
      <div className="row">
        <div className="six columns">
          <label>First Name</label>
          <input
            className="u-full-width"
            placeholder="First Name"
            type="text"
            onChange={(e) => onChange(e)}
            value={data.firstName? data.firstName : ""}
            name="firstName"
            autoFocus
          />
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <label>Last Name</label>
          <input
            className="u-full-width"
            placeholder="Last Name"
            type="text"
            onChange={(e) => onChange(e)}
            value={data.lastName ? data.lastName : ""}
            name="lastName"
          />
        </div>
      </div>
      <button onClick={onNext}>Next</button>
    </div>
  )

};

const StepTwo = ({ data, onChange, onNext, onPrev }) => {

  return (
    <div>
      <div className="row">
        <div className="six columns">
          <label>First Name</label>
          <input
            className="u-full-width"
            placeholder="First Name"
            type="text"
            onChange={(e) => onChange(e)}
            value={data.firstName? data.firstName : ""}
            name="firstName"
            autoFocus
          />
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <label>Last Name</label>
          <input
            className="u-full-width"
            placeholder="Last Name"
            type="text"
            onChange={(e) => onChange(e)}
            value={data.lastName ? data.lastName : ""}
            name="lastName"
          />
        </div>
      </div>
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  )

};

const StepThree = ({ data, onChange, onNext, onPrev }) => {

  return (
    <div>
      <div className="row">
        <div className="six columns">
          <label>First Name</label>
          <input
            className="u-full-width"
            placeholder="First Name"
            type="text"
            onChange={(e) => onChange(e)}
            value={data.firstName? data.firstName : ""}
            name="firstName"
            autoFocus
          />
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <label>Last Name</label>
          <input
            className="u-full-width"
            placeholder="Last Name"
            type="text"
            onChange={(e) => onChange(e)}
            value={data.lastName ? data.lastName : ""}
            name="lastName"
          />
        </div>
      </div>
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  )

};

const StepFour = ({ data, onChange, onPrev }) => {

  return (
    <div>
      <div className="row">
        <div className="six columns">
          <label>First Name</label>
          <input
            className="u-full-width"
            placeholder="First Name"
            type="text"
            onChange={(e) => onChange(e)}
            value={data.firstName? data.firstName : ""}
            name="firstName"
            autoFocus
          />
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <label>Last Name</label>
          <input
            className="u-full-width"
            placeholder="Last Name"
            type="text"
            onChange={(e) => onChange(e)}
            value={data.lastName ? data.lastName : ""}
            name="lastName"
          />
        </div>
      </div>
      <button onClick={onPrev}>Previous</button>
    </div>
  )

};

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : {
      step1: {},
      step2: {},
      step3: {},
      step4: {}
    }
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (stepKey, e) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], [e.target.name]: e.target.value }
    }));
  }

  const validateStep = (stepKey) => {

    return true;
  }

  const nextStep = () => {
    if (validateStep(`step${step}`)) {
      setStep(prev => prev + 1);
    }
  }

  const prevStep = () => {
    setStep(prev => prev - 1);
  }

  return (
    <div>
      {step === 1 &&
        <StepOne
          data={formData.step1}
          onChange={data => updateFormData('step1', data)}
          onNext={nextStep}
        />}
      {step === 2 &&
        <StepTwo
          data={formData.step2}
          onChange={data => updateFormData('step2', data)}
          onPrev={prevStep}
          onNext={nextStep}
        />}
      {step === 3 &&
        <StepThree
          data={formData.step3}
          onChange={data => updateFormData('step3', data)}
          onNext={nextStep}
          onPrev={prevStep}
        />}
      {step === 4 &&
        <StepFour
          data={formData.step4}
          onChange={data => updateFormData('step4', data)}
          onPrev={prevStep}
        />}
    </div>
  )
}

export default App;
