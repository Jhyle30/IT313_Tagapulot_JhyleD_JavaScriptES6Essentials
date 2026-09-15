import isPassing, { computeAverage } from "./gradeUtils.js";

const enrollees = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];

function getEnrollees() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
}

async function generateReport() {
    try {
        const records = await getEnrollees();

        const results = records.map((enrollee) => {

            const { name, prelim, midterm, final } = enrollee;

            const average = computeAverage(prelim, midterm, final);

            let status;

            if (isPassing(average)) {
                status = "PASSING";
            } else {
                status = "PROBATION";
            }

            return {
                name: name,
                average: average,
                status: status
            };
        });

        const passing = results.filter((student) => {
            return student.status === "PASSING";
        });

        const total = results.reduce((sum, student) => {
            return sum + student.average;
        }, 0);

        const classAverage = total / results.length;

        let report = `=== IT313 Enrollment Eligibility Report ===\n`;

        results.forEach((student) => {
            report += `${student.name} - Average: ${student.average.toFixed(2)} - ${student.status}\n`;
        });

        report += `Class Average: ${classAverage.toFixed(2)}\n`;
        report += `Passing: ${passing.length} / ${results.length}`;

        console.log(report);

    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

generateReport();