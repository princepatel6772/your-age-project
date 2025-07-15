function submitBirthday() {
    const birthday = document.getElementById("birthday").value;
    const userName = localStorage.getItem("userName");

    if (birthday) {
        localStorage.setItem("birthday", birthday);
        window.location.href = "result.html";
    } else {
        alert("Please enter your birthday.");
    }
}

window.onload = function () {
    if (window.location.pathname.includes("result.html")) {
        const userName = localStorage.getItem("userName");
        const birthday = localStorage.getItem("birthday");
        const today = new Date();
        const birthDate = new Date(birthday);

        const years = today.getFullYear() - birthDate.getFullYear();
        const months = today.getMonth() - birthDate.getMonth();
        const days = today.getDate() - birthDate.getDate();

        document.getElementById("years").innerText = `${years}Y`;
        document.getElementById("months").innerText = `${months >= 0 ? months : months + 12}M`;
        document.getElementById("days").innerText = `${days >= 0 ? days : days + 30}D`;

        const sameDay = today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth();

        if (sameDay) {
            document.getElementById("greeting").innerText = `Happy Birthday, ${userName}!`;
            document.getElementById("nextBirthday").innerText = "";
        } else {
            document.getElementById("greeting").innerText = `Advance Happy Birthday, ${userName}!`;

            let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
            if (nextBirthday < today) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }

            const diff = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
            const monthsLeft = Math.floor(diff / 30);
            const daysLeft = diff % 30;

            document.getElementById("nextBirthday").innerText = `Next birthday in: ${monthsLeft} months ${daysLeft} days`;

            // Optional: Backend Save
            fetch("http://localhost:5000/api/saveUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, birthday, age: `${years}Y ${months}M ${days}D` })
            });
        }
    }
};
