document.addEventListener("DOMContentLoaded", function() {
    loadUsernames();
    updateClock();
    setInterval(updateClock, 1000); // อัปเดตเวลาทุกวินาที
});

// โหลดรายชื่อจาก JSON (เปลี่ยนเป็น username)
function loadUsernames() {
    fetch("https://script.google.com/macros/s/AKfycbwy0lJqri9OKOxQgOCgzXT-Htjyml0J0hSAVkvQtN_Aw2ndNshX8ZxSj7rcHeTMDUSn/exec")
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("nameSelect");
            data.forEach(user => {
                let option = document.createElement("option");
                option.value = user.username; // ใช้ username เป็นค่าที่ส่งไป
                option.textContent = user.firstName; // แสดงชื่อจริงใน dropdown
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
    const username = document.getElementById("nameSelect").value;
    const time = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });

    console.log("✅ Username:", username);
    console.log("✅ Time:", time);

    if (!username) {
        alert("กรุณาเลือกชื่อก่อนกดลงเวลา");
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbyjzPPZNIwGQ8V7T7TZGP7nu2ExbnXKrfxHLl0CdNm95HkYxF9RituJHtM0mOp-EKBbNw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, time })
    })
    .then(response => response.json())
    .then(data => {
        console.log("📌 Response:", data);
        if (data.result === "success") {
            alert("บันทึกข้อมูลเรียบร้อย!");
        } else {
            alert("เกิดข้อผิดพลาด!");
        }
    })
    .catch(error => console.error("❌ Error sending data:", error));
}
