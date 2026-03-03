let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

function addMedicine() {
    const name = document.getElementById("medicineName").value;
    const dosage = document.getElementById("dosage").value;
    const time = document.getElementById("time").value;

    if (name === "" || dosage === "" || time === "") {
        alert("Please fill all fields!");
        return;
    }

    const medicine = { name, dosage, time };
    medicines.push(medicine);
    localStorage.setItem("medicines", JSON.stringify(medicines));

    displayMedicines();
}

function displayMedicines() {
    const list = document.getElementById("medicineList");
    list.innerHTML = "";

    medicines.forEach((med, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${med.name} - ${med.dosage} at ${med.time}
                        <button onclick="deleteMedicine(${index})">❌</button>`;
        list.appendChild(li);
    });
}

function deleteMedicine(index) {
    medicines.splice(index, 1);
    localStorage.setItem("medicines", JSON.stringify(medicines));
    displayMedicines();
}

// Reminder Checker
setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0,5);

    medicines.forEach(med => {
        if (med.time === currentTime) {
            alert(`Time to take ${med.name} (${med.dosage})`);
            playSound();
        }
    });
}, 60000);

function playSound() {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");
    audio.play();
}

displayMedicines();