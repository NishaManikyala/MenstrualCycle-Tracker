let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let cycleLength = 0;
let startDate = null;

function generateCalendar() {
  const calendarBody = document.getElementById("calendar-body");
  const currentMonthYear = document.getElementById("current-month-year");
  calendarBody.innerHTML = "";

  // Generate dates for the current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();

  currentMonthYear.querySelector("#month-dropdown").value = currentMonth;
  currentMonthYear.querySelector("#year-dropdown").value = currentYear;
  
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay.getDay()) {
        const cell = document.createElement("td");
        row.appendChild(cell);
      } else if (date > totalDays) {
        break;
      } else {
        const cell = document.createElement("td");
        cell.textContent = date;

        if (
          date === new Date().getDate() &&
          currentMonth === new Date().getMonth() &&
          currentYear === new Date().getFullYear()
        ) {
          cell.classList.add("today");
        }

        if (cycleLength > 0 && startDate) {
          const dayDiff = Math.floor((new Date(currentYear, currentMonth, date) - startDate) / (1000 * 60 * 60 * 24));
          if (dayDiff % cycleLength === 0) {
            cell.classList.add("menstrual-day");
          }
        }

        row.appendChild(cell);
        date++;
      }
    }

    calendarBody.appendChild(row);
  }
}

function changeMonth(value) {
  currentMonth += value;

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  generateCalendar();
}

function changeMonthDropdown() {
  currentMonth = parseInt(document.getElementById("month-dropdown").value);
  generateCalendar();
}

function changeYearDropdown() {
  currentYear = parseInt(document.getElementById("year-dropdown").value);
  generateCalendar();
}

function getMonthName(month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return months[month];
}

function trackCycle() {
  cycleLength = parseInt(document.getElementById("cycle-length").value);
  startDate = new Date(document.getElementById("start-date").value);
  generateCalendar();
}

function populateYearDropdown() {
  const yearDropdown = document.getElementById("year-dropdown");
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 10; // Display 10 years back
  const endYear = currentYear + 10; // Display 10 years ahead

  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearDropdown.appendChild(option);
  }

  yearDropdown.value = currentYear;
}

generateCalendar();
populateYearDropdown();