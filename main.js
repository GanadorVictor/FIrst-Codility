function solution(A, D) {
    // Calculate the total amount of transactions without the card charges
    let sumWithoutCharges = A.reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    // Check if the transactions in a month amount to 100 or more, if not charge a fee of 5 for the month
    let monthIndexArray = [];

    D.forEach((month) => {
        monthIndexArray.push(parseInt(month.split("-")[1])); // Convert month to integer
    });

    let monthsNotPaying = [];
    let monthCounter = 0;

    // Loop through the transactions
    for (let i = 0; i < A.length; i++) {
        // If the current transaction and the next two transactions amount to 100 or more
        if (A[i] + A[i + 1] + A[i + 2] >= 100) {
            // Check if the next two transactions are in the same month
            if (monthIndexArray[i] == monthIndexArray[i + 1] && monthIndexArray[i] == monthIndexArray[i + 2]) {
                // If the next two transactions are in the same month, add the month index to the monthsNotPaying array
                monthsNotPaying.push(monthIndexArray[i]);
            }
        } else {
            // If the current transaction and the next two transactions do not amount to 100 or more
            // Check if the next two transactions are in the same month
            if (monthIndexArray[i] == monthIndexArray[i + 1] && monthIndexArray[i] == monthIndexArray[i + 2]) {
                // If the next two transactions are in the same month, subtract the fee of 5 from the balance
                for (let j = 1; j <= 12; j++) {
                    if (monthsNotPaying.includes(j)) {
                        // If the month is already in the monthsNotPaying array, skip it
                        continue;
                    } else {
                        // If the month is not in the monthsNotPaying array, subtract the fee of 5 from the balance
                        sumWithoutCharges -= 5;
                    }
                }
            }
        }
    }

    let balance = sumWithoutCharges;

    // Return the balance
    return balance;
}

console.log(solution([100, 100, 100, -10], ['2020-12-31', '2020-12-22', '2020-12-03', '2020-12-29']));