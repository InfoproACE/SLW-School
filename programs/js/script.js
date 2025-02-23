async function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/programs/data/teachers.json");
        const teachers = await response.json();

        const teacher = teachers.find(t => t.username === username && t.password === password);

        if (teacher) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(teacher));
            window.location.href = "teacher.html";  // เปลี่ยนไปยังหน้า teacher.html
        } else {
            document.getElementById("error").textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
    }
}
