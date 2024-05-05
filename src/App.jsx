import { useState } from "react";
import { Parser } from "@json2csv/plainjs";
import fileDownload from "js-file-download";
import "./App.css";

const INPUT_TYPE = {
  FILE: "file",
  TEXTAREA: "textarea",
};

const INPUT_TYPE_LIST = [
  {
    label: "Textarea",
    value: "textarea",
  },
  {
    label: "File",
    value: "file",
  },
];

const App = () => {
  const [inputType, setInputType] = useState(INPUT_TYPE.TEXTAREA);
  const [fileValue, setFileValue] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleInputFile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      try {
        setFileValue(fileReader.result);
      } catch {
        alert("NOT VALID JSON FILE !");
      }
    };

    if (files?.length) {
      fileReader.readAsText(files[0]);
    }
  };

  const handleFormatCSV = () => {
    const checkingValue = inputType === INPUT_TYPE.FILE ? fileValue : textAreaValue;

    if (checkingValue) {
      const parser = new Parser();
      const csv = parser.parse(JSON.parse(checkingValue));
      fileDownload(csv, "file.csv");
    }
  };

  return (
    <div className="container">
      <select onChange={(e) => setInputType(e.target.value)}>
        {INPUT_TYPE_LIST.map((inputTypeList, i) => (
          <option value={inputTypeList.value} key={i}>
            {inputTypeList.label}
          </option>
        ))}
      </select>

      {inputType === INPUT_TYPE.TEXTAREA ? (
        <textarea onChange={(e) => setTextAreaValue(e.target.value)} />
      ) : (
        <input type="file" accept=".json" onChange={handleInputFile} />
      )}
      <button onClick={handleFormatCSV}>Format CSV</button>
    </div>
  );
};

export default App;
