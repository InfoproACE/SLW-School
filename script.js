document.addEventListener("DOMContentLoaded", function () {
    loadUsernames();
    updateClock();
    setInterval(updateClock, 1000); // อัปเดตเวลาทุกวินาที
});

// 📌 โหลดรายชื่อจาก Local Storage
function loadUsernames() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const select = document.getElementById("nameSelect");
    select.innerHTML = "<option value=''>-- เลือกชื่อ --</option>"; // ตัวเลือกเริ่มต้น

    users.forEach(user => {
        let option = document.createElement("option");
        option.value = user.firstName;
        option.textContent = user.firstName;
        select.appendChild(option);
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
    const user = document.getElementById("nameSelect").value;

    if (!user) {
        alert("กรุณาเลือกชื่อก่อนลงเวลา!");
        return;
    }

    saveToLocalStorage("clockIn", user);
}

// 📌 ส่งข้อมูลการลงเวลาออก
function sendClockOut() {
    const user = document.getElementById("nameSelect").value;

    if (!user) {
        alert("กรุณาเลือกชื่อก่อนลงเวลาออก!");
        return;
    }

    saveToLocalStorage("clockOut", user);
}

// 📌 ฟังก์ชันหลักสำหรับบันทึกข้อมูลใน Local Storage
function saveToLocalStorage(action, user) {
    const now = new Date();
    const time = new Intl.DateTimeFormat('th-TH', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: "Asia/Bangkok"
    }).format(now);

    const record = {
        action: action,
        user: user,
        time: time
    };

    // ดึงข้อมูลเดิมจาก Local Storage
    const records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(record); // เพิ่มข้อมูลใหม่
    localStorage.setItem("records", JSON.stringify(records)); // บันทึกข้อมูลกลับไป

    alert(`บันทึกข้อมูล ${action} สำหรับ ${user} เรียบร้อย!`);
    document.getElementById("nameSelect").value = ""; // เคลียร์ค่า dropdown หลังทำรายการ
}
