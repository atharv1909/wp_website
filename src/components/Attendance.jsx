import React, { useState } from "react";
import './Attendance.css';

const Attendance = () => {
  const [attendance, setAttendance] = useState(
    Array.from({ length: 31 }, (_, i) => ({ date: i + 1, present: false }))
  );
  const [modalActive, setModalActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [subjectAttendance, setSubjectAttendance] = useState({
    Mathematics: false,
    Science: false,
    History: false,
    Geography: false,
  });

  const openModal = (date) => {
    setSelectedDate(date);
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleCheckboxChange = (subject) => {
    setSubjectAttendance((prevState) => ({
      ...prevState,
      [subject]: !prevState[subject],
    }));
  };

  const saveAttendance = () => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((entry) =>
        entry.date === selectedDate
          ? {
              ...entry,
              present: Object.values(subjectAttendance).every(
                (status) => status === true
              ),
            }
          : entry
      )
    );
    closeModal();
  };

  const isAbsent = Object.values(subjectAttendance).some(status => status === false);

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h1>Attendance</h1>
      </div>
      <div className="attendance-calendar-box">
        <div className="attendance-legend">
          <div className="attendance-legend-item">
            <div className="attendance-legend-color attendance-present"></div>
            <span>Present</span>
          </div>
          <div className="attendance-legend-item">
            <div className="attendance-legend-color attendance-absent"></div>
            <span>Absent</span>
          </div>
          <div className="attendance-legend-item">
            <div className="attendance-legend-color attendance-holiday"></div>
            <span>Holiday</span>
          </div>
        </div>
        <div className="attendance-calendar">
          <h2>June 2023</h2>
          <div className="attendance-calendar-nav">
            <button className="attendance-nav-button">&#60;</button>
            <button className="attendance-nav-button">&#62;</button>
          </div>
          <table className="attendance-calendar-table">
            <thead>
              <tr>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
                <th>Su</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 7 }, (_, colIndex) => {
                    const day = rowIndex * 7 + colIndex + 1;
                    if (day <= 31) {
                      const dayData = attendance.find((entry) => entry.date === day);
                      return (
                        <td
                          key={day}
                          onClick={() => openModal(day)}
                          className={`attendance-calendar-day ${
                            dayData.present ? "attendance-present" : ""
                          } ${isAbsent ? "attendance-absent" : ""}`}
                        >
                          {day}
                        </td>
                      );
                    }
                    return <td key={colIndex}></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalActive && selectedDate !== null && (
        <div className="attendance-modal-overlay">
          <div className="attendance-modal">
            <button className="attendance-close-button" onClick={closeModal}>
              X
            </button>
            <h2>Mark Attendance for {selectedDate}</h2>
            <div className="attendance-subject-list">
              <h3>Subjects</h3>
              {["Mathematics", "Science", "History", "Geography"].map((subject) => (
                <div key={subject} className="attendance-subject-item">
                  <label className="attendance-subject-checkbox">
                    <input
                      type="checkbox"
                      checked={subjectAttendance[subject]}
                      onChange={() => handleCheckboxChange(subject)}
                    />
                    {subjectAttendance[subject] ? "Present" : "Absent"} - {subject}
                  </label>
                </div>
              ))}
            </div>
            <button className="attendance-save-button" onClick={saveAttendance}>
              Save Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
