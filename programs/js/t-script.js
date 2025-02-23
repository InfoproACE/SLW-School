// สมมติว่าข้อมูลผู้ใช้ถูกเก็บใน localStorage
const teacherData = JSON.parse(localStorage.getItem('loggedInTeacher'));

if (teacherData) {
    // แสดงข้อมูลครู
    document.getElementById('teacher-name').textContent = `${teacherData.firstName} ${teacherData.lastName}`;
    document.getElementById('teacher-photo').src = teacherData.profilePic || 'default-photo.jpg';

    // ตรวจสอบว่าเป็นนาย (หัวหน้าฝ่ายวิชาการเพียงคนเดียว)
    if (teacherData.username === '25002') {
        document.getElementById('academic-head-button').style.display = 'block';
    }
}
