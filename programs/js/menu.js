document.addEventListener("DOMContentLoaded", async function () {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    
    if (!loggedInUser) {
        alert("กรุณาเข้าสู่ระบบก่อน!");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwrm9heBvRHM2Tj5urKYL4avVz2vhNIHfXjj0XaTlSUBUNRtTY_P9ia603mI8EStj109w/exec");
        
        if (!response.ok) {
            throw new Error("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
        }

        const users = await response.json();
        const user = users.find(u => u.username === loggedInUser.username);

        if (!user) {
            // alert("ไม่พบข้อมูลผู้ใช้");
            sessionStorage.removeItem("loggedInUser");
            // window.location.href = "login.html";
            // return;
        }

        document.querySelectorAll(".sup-menu").forEach(menu => {
            menu.addEventListener("click", function () {
                const selectedDepartment = this.id; // รับค่า ID ของเมนูที่กด
                const pageMap = {
                    GD: "gd.html",
                    HR: "hr.html",
                    AD: "ad.html",
                    SA: "sa.html"
                };

                if (user.department === "EX" || user.department === selectedDepartment) {
                    window.location.href = pageMap[selectedDepartment] || "index.html"; // เปลี่ยนหน้า
                } else {
                    alert("คุณไม่สามารถเข้าหน้านี้ได้");
                }
            });
        });

    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    }
});
