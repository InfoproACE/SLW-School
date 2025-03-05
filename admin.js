document.addEventListener("DOMContentLoaded", function () {
    loadRecords();
});

// 📌 โหลดข้อมูลจาก Local Storage และแสดงผล
function loadRecords() {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    const tableBody = document.getElementById("recordsTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // เคลียร์ข้อมูลเดิม

    records.forEach(record => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = record.user;
        row.insertCell(1).textContent = record.action;
        row.insertCell(2).textContent = record.time;
    });
}
