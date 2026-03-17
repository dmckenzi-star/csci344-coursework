
// Global Variables

let searchTerm = "";
let openOnly = false;



// Helper Functions

function getInstructorString(course) {
    return course.Instructors.map(function (instructor) {
        return instructor.Name;
    }).join(" &bull; ");
}

function isClassFull(course) {
    return !course.Classification.Open;
}
function doesTermMatch(course) {
    if (searchTerm === "") {
        return true;
    }

    // normalize once
    const term = searchTerm.toLowerCase().trim();

    // build strings to check against
    const instructorString = getInstructorString(course).toLowerCase();
    const titleString = course.Title.toLowerCase();
    const codeString = course.Code.toLowerCase();

    // check each field
    const instructorMatch = instructorString.includes(term);
    const titleMatch = titleString.includes(term);
    const crnMatch = course.CRN.toString() === term;
    const codeMatch = codeString.includes(term);

    return instructorMatch || titleMatch || crnMatch || codeMatch;
}

// Returns an HTML string for a course card
function dataToHTML(course) {
    return `
        <section class="course-card">
            <h2>${course.Code}: ${course.Title}</h2>
            ${getOpenClosedHTML(course)}
            <p>
                ${course.Days || "TBA"} &bull; ${course.Location && course.Location.FullLocation ? course.Location.FullLocation : "TBA"} &bull; ${course.Hours} credit hour(s)
            </p>
            <p>
                <strong>${getInstructorString(course)}</strong>
            </p>
        </section>
    `;
}

// Returns the open/closed status HTML snippet for a course
function getOpenClosedHTML(course) {
    if (isClassFull(course)) {
        return `
            <p class="status closed">
                <i class="fa-solid fa-circle-xmark"></i>
                Closed &bull; ${course.CRN} &bull; Number on Waitlist ${course.WaitlistAvailable}
            </p>
        `;
    } else {
        const seatsAvailable = course.EnrollmentMax - course.EnrollmentCurrent;
        return `
            <p class="status open">
                <i class="fa-solid fa-circle-check"></i>
                Open &bull; ${course.CRN} &bull; Seats Available: ${seatsAvailable}
            </p>
        `;
    }
}


// Main Functions


function showMatchingCourses() {
    // 1. Get the .courses container
    const containerEl = document.querySelector(".courses");

    // 2. Clear it
    containerEl.innerHTML = "";

    // 3. Start with the full courseList and apply the search term filter
    let matchingCourses = courseList.filter(doesTermMatch);

    // 4. If user wants open only, also filter out full classes
    if (openOnly) {
        matchingCourses = matchingCourses.filter(function (course) {
            return !isClassFull(course);
        });
    }

    // 5. If no matches, show a message and return early
    if (matchingCourses.length === 0) {
        containerEl.innerHTML = '<p class="no-results">No courses match your search.</p>';
        return;
    }

    // 6. Output each course using forEach + insertAdjacentHTML
    matchingCourses.forEach(function (course) {
        const htmlSnippet = dataToHTML(course);
        containerEl.insertAdjacentHTML("beforeend", htmlSnippet);
    });
}

// Updates global variables from the DOM, then re-renders
function filterCourses() {
    searchTerm = document.querySelector("#search_term").value;
    openOnly = document.querySelector("#is_open").checked;
    showMatchingCourses();
}


showMatchingCourses();
