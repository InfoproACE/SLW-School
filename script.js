document.addEventListener("DOMContentLoaded", function () {
    loadUsernames();
    updateClock();
    setInterval(updateClock, 1000); // อัปเดตเวลาทุกวินาที
});

// 📌 โหลดรายชื่อจาก Google Apps Script Web App
function loadUsernames() {
    const url = "https://script.google.com/macros/s/AKfycbwy0lJqri9OKOxQgOCgzXT-Htjyml0J0hSAVkvQtN_Aw2ndNshX8ZxSj7rcHeTMDUSn/exec";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("nameSelect");
            select.innerHTML = "<option value=''>-- เลือกชื่อ --</option>"; // ตัวเลือกเริ่มต้น

            data.forEach(user => {
                let option = document.createElement("option");
                option.value = user.firstName; 
                option.textContent = user.firstName;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("เกิดข้อผิดพลาดในการโหลดรายชื่อ:", error);
            alert("ไม่สามารถโหลดรายชื่อได้ กรุณาลองใหม่!");
        });
}

// 📌 อัปเดตเวลาตามโซนเวลาไทย
function updateClock() {
    const now = new Date();
    document.getElementById("clock").textContent = new Intl.DateTimeFormat('th-TH', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: "Asia/Bangkok"
    }).format(now);
}

// 📌 ส่งข้อมูลการลงเวลาเข้า
function sendData() {
    var user = document.getElementById("nameSelect").value;

    if (!user) {
        alert("กรุณาเลือกชื่อก่อนลงเวลา!");
        return;
    }

    sendRequest("clockIn", user);
}

// 📌 ส่งข้อมูลการลงเวลาออก
function sendClockOut() {
    var user = document.getElementById("nameSelect").value;

    if (!user) {
        alert("กรุณาเลือกชื่อก่อนลงเวลาออก!");
        return;
    }

    sendRequest("clockOut", user);
}

// 📌 ฟังก์ชันหลักสำหรับส่งข้อมูลไป Google Apps Script
function sendRequest(action, user) {
    var url = "https://script.google.com/macros/s/AKfycbz0Meb_YljFpAb3kZoI2dkG509NWzFz1Oeo7UjjH3Ij2nAaJ8ajgoWGjRg7IzvCho-iDQ/exec";
    var params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: action, user: user })
    };

    fetch(url, params)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById("nameSelect").value = ""; // เคลียร์ค่า dropdown หลังทำรายการ
        })
        .catch(error => {
            console.error("Error:", error);
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่!");
        });
}
