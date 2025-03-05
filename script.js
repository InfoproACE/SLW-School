document.addEventListener("DOMContentLoaded", function () {
    loadUsernames();
    updateClock();
    setInterval(updateClock, 1000); // อัปเดตเวลาทุกวินาที
});

// โหลดรายชื่อจาก JSON 
function loadUsernames() {
    fetch("https://script.google.com/macros/s/AKfycbwy0lJqri9OKOxQgOCgzXT-Htjyml0J0hSAVkvQtN_Aw2ndNshX8ZxSj7rcHeTMDUSn/exec")
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("nameSelect");
            select.innerHTML = ""; // เคลียร์ตัวเลือกก่อนโหลดใหม่

            data.forEach(user => {
                let option = document.createElement("option");
                option.value = user.firstName; // ใช้ firstName เป็นค่าที่ส่งไป
                option.textContent = user.firstName; // แสดง firstName ใน dropdown
                select.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
}

// อัปเดตเวลาตามประเทศไทย
function updateClock() {
    const now = new Date();
    document.getElementById("clock").textContent = new Intl.DateTimeFormat('th-TH', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: "Asia/Bangkok"
    }).format(now);
}

// ส่งข้อมูลไป Google Sheets
function sendData() {
    const select = document.getElementById("nameSelect");
    const firstName = select.value; // ดึงค่าที่ถูกเลือกจาก dropdown
    const time = new Intl.DateTimeFormat('th-TH', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: "Asia/Bangkok"
    }).format(new Date());

    fetch("https://script.google.com/macros/s/AKfycbzwyXfh3coDeli0fn0NCKOom94HZemZjvvWMoG-UQ7sEw7iNkvN1MAj91eBRcnvyAncBA/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, time }),
        redirect: "follow" // เพิ่ม redirect เพื่อจัดการการตอบกลับจาก Google Apps Script
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.result === "success") {
            alert("บันทึกข้อมูลเรียบร้อย!");
        } else {
            alert("เกิดข้อผิดพลาด: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error sending data:", error);
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล!");
    });
}
