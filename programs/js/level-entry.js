let levels = {
};

// ฟังก์ชันเพื่อโหลดข้อมูลวิชา
function loadLevel() {
    const savedLevel = JSON.parse(localStorage.getItem('levels'));
    if (savedLevel) {
        levels = savedLevel; // อัปเดต levels ด้วยข้อมูลจาก localStorage
    }

    const levelSelect = document.getElementById('levelSelect');
    for (let level in levels) {
        let option = document.createElement('option');
        option.value = level;
        option.innerText = level;
        levelSelect.appendChild(option);
    }
}

// ฟังก์ชันเพื่อโหลดข้อมูลนักเรียนสำหรับวิชาที่เลือก
function loadStudentsForLevel(level) {
    const studentTable = document.getElementById('studentTable');
    studentTable.innerHTML = ''; // ล้างข้อมูลเก่าก่อนโหลดใหม่

    levels[level].forEach(student => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td><input type="text" id="grade-${student.id}" value="${student.grade}" disabled></td>
            <td>
                <button onclick="enableEdit('${level}', '${student.id}')">แก้ไข</button>
                <button id="save-${student.id}" onclick="saveGrade('${level}', '${student.id}')" disabled>บันทึก</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}

// ฟังก์ชันเพื่อเปิดให้แก้ไขคะแนน
function enableEdit(level, studentId) {
    let gradeInput = document.getElementById(`grade-${studentId}`);
    gradeInput.disabled = false;

    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = false;
}

// ฟังก์ชันเพื่อบันทึกคะแนนและรีเฟรชข้อมูล
function saveGrade(level, studentId) {
    let gradeInput = document.getElementById(`grade-${studentId}`);
    gradeInput.disabled = true;

    const grade = gradeInput.value;
    updateGrade(level, studentId, grade);

    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = true;

    // หลังจากบันทึกข้อมูลแล้ว รีโหลดข้อมูลทั้งหมดเพื่ออัปเดตตาราง
    loadStudentsForLevel(level);
}

// ฟังก์ชันเพื่ออัปเดตคะแนนในอาร์เรย์ levels และบันทึกใน localStorage
function updateGrade(level, studentId, grade) {
    const student = levels[level].find(s => s.id === studentId);
    if (student) {
        student.grade = grade;
        saveLevel();
    }
}

// ฟังก์ชันเพื่อบันทึกข้อมูลลงใน localStorage
function saveLevel() {
    localStorage.setItem('levels', JSON.stringify(levels));
}

// เมื่อเลือกวิชา ให้โหลดข้อมูลนักเรียนในวิชานั้น
document.getElementById('levelSelect').addEventListener('change', function() {
    const selectedLevel = this.value;
    loadStudentsForLevel(selectedLevel);
});

// โหลดข้อมูลวิชาเมื่อเปิดหน้า
loadLevel();

// ---------------------------------------------------------------------------------------------

// ฟังก์ชันเพื่อบันทึกประวัติการแก้ไข
function saveEditHistory(level, studentId, oldGrade, newGrade) {
    const user = JSON.parse(localStorage.getItem('currentUser')); // ดึงข้อมูลผู้ใช้ที่ล็อกอิน
    const timestamp = new Date().toLocaleString(); // เวลาปัจจุบัน

    const historyItem = {
        level: level,
        studentId: studentId,
        studentName: levels[level].find(s => s.id === studentId).name,
        oldGrade: oldGrade,
        newGrade: newGrade,
        editedBy: user.username, // ใช้ชื่อผู้ใช้จากการล็อกอิน
        timestamp: timestamp
    };

    let editHistory = JSON.parse(localStorage.getItem('editHistory')) || [];
    editHistory.push(historyItem);
    localStorage.setItem('editHistory', JSON.stringify(editHistory));
}

// ปรับปรุงฟังก์ชันเพื่อบันทึกคะแนนและบันทึกประวัติการแก้ไข
function saveGrade(level, studentId) {
    let gradeInput = document.getElementById(`grade-${studentId}`);
    let oldGrade = levels[level].find(s => s.id === studentId).grade;
    let newGrade = gradeInput.value;

    gradeInput.disabled = true;

    if (oldGrade !== newGrade) {
        updateGrade(level, studentId, newGrade);
        saveEditHistory(level, studentId, oldGrade, newGrade); // บันทึกประวัติการแก้ไข
    }

    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = true;

    loadStudentsForLevel(subject);
}
