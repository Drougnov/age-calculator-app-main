const validateInput = (input, validator) => {
    if (input.value === "") {
        input.parentElement.classList.remove("invalid-value");
        input.parentElement.classList.add("empty-value");
        return false;
    } else if (!validator(input.value)) {
        input.parentElement.classList.add("invalid-value");
        input.parentElement.classList.remove("empty-value");
        return false;
    } else {
        input.parentElement.classList.remove("invalid-value");
        input.parentElement.classList.remove("empty-value");
        return true;
    }
};

const isDayValid = (day, month, year) => {
    const leapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    const maxDays = [
        31,
        leapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    return Number.isInteger(day) && day >= 1 && day <= maxDays[month - 1];
};

const isMonthValid = (month) => {
    return Number.isInteger(month) && month >= 1 && month <= 12;
};

const isYearValid = (year) => {
    const currentYear = new Date().getFullYear();
    return Number.isInteger(year) && year >= 1 && year <= currentYear; //year >= 1971 is the best practice
};

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dayInput = document.querySelector(".day");
    const monthInput = document.querySelector(".month");
    const yearInput = document.querySelector(".year");

    const isDayInputValid = validateInput(dayInput, (value) =>
        isDayValid(
            Number(value),
            Number(monthInput.value),
            Number(yearInput.value)
        )
    );
    const isMonthInputValid = validateInput(monthInput, (value) =>
        isMonthValid(Number(value))
    );
    const isYearInputValid = validateInput(yearInput, (value) =>
        isYearValid(Number(value))
    );

    if (isDayInputValid && isMonthInputValid && isYearInputValid) {
        const inputDate = new Date(
            Number(yearInput.value),
            Number(monthInput.value) - 1,
            Number(dayInput.value)
        );
        const timeDiff = new Date() - inputDate;
        const ageDate = new Date(timeDiff);
        const ageYear = ageDate.getUTCFullYear() - 1970;
        const ageMonth = ageDate.getUTCMonth();
        const ageDay = ageDate.getUTCDate() - 1;

        document.querySelector(".age__year").textContent = ageYear;
        document.querySelector(".age__month").textContent = ageMonth;
        document.querySelector(".age__day").textContent = ageDay;
    }
});
