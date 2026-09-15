export function computeAverage(prelim, midterm, final) {
    let average = (prelim + midterm + final) / 3;
    return average;
}

export default function IsPassing(average) {
    if (average >= 75) {
        return true;
    } else {
        return false; 
    }
}