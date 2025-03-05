document.addEventListener("DOMContentLoaded", function() {
    loadNames();
    updateClock();
    setInterval(updateClock, 1000); // อัปเดตเวลาทุกวินาที
});

// โหลดรายชื่อจาก JSON
function loadNames() {
    fetch("https://script.google.com/macros/s/AKfycbwy0lJqri9OKOxQgOCgzXT-Htjyml0J0hSAVkvQtN_Aw2ndNshX8ZxSj7rcHeTMDUSn/exec")
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("nameSelect");
            data.forEach(person => {
                let option = document.createElement("option");
                option.value = person.name;
                option.textContent = person.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
}

// อัปเดตเวลาตามประเทศไทย
function updateClock() {
    const now = new Date();
    const options = { timeZone: "Asia/Bangkok", hour12: false };
    document.getElementById("clock").textContent = new Intl.DateTimeFormat('th-TH', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(now);
}

// ส่งข้อมูลไป Google Sheets
function sendData() {
    const name = document.getElementById("nameSelect").value;
    const time = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });

    if (!name) {
        alert("กรุณาเลือกชื่อก่อนกดลงเวลา");
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbyjzPPZNIwGQ8V7T7TZGP7nu2ExbnXKrfxHLl0CdNm95HkYxF9RituJHtM0mOp-EKBbNw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, time })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            alert("บันทึกข้อมูลเรียบร้อย!");
        } else {
            alert("เกิดข้อผิดพลาด!");
        }
    })
    .catch(error => console.error("Error sending data:", error));
}
