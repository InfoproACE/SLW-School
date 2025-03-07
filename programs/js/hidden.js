document.addEventListener("DOMContentLoaded", function () {
    const menu = document.createElement("main");
    menu.id = "menu";
    
    const countdown = document.getElementById("countdown");
    
    // ตั้งค่ากำหนดเวลา (23 เมษายน 2568 เวลา 12:00 น.)
    const targetDate = new Date("April 23, 2025 12:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            // เมื่อถึงเวลา ลบ countdown และเพิ่ม menu เข้าไปใน body
            countdown.remove();
            menu.innerHTML = `
                <div class="klw-flex">
                    <h1>ลงคะแนนวิชาทั่วไป</h1>
                </div>
                <div class="menu">
                    <div class="sub-menu" onclick="window.location.href='grade1'">ลงคะแนนวิชาทั่วไป ม.1</div> 
                    <div class="sub-menu" onclick="window.location.href='grade2'">ลงคะแนนวิชาทั่วไป ม.2</div> 
                    <div class="sub-menu" onclick="window.location.href='grade3'">ลงคะแนนวิชาทั่วไป ม.3</div> 
                </div>
                <div class="menu">
                    <div class="sub-menu" onclick="window.location.href='grade4'">ลงคะแนนวิชาทั่วไป ม.4</div> 
                    <div class="sub-menu" onclick="window.location.href='grade5'">ลงคะแนนวิชาทั่วไป ม.5</div> 
                    <div class="sub-menu" onclick="window.location.href='grade6'">ลงคะแนนวิชาทั่วไป ม.6</div> 
                </div>
            `;
            document.body.appendChild(menu);
        } else {
            // คำนวณเวลาที่เหลือ
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdown.innerHTML = `<h2>เหลือเวลา ${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที</h2>`;
            countdown.style.display = "block";
        }
    }
    
    updateCountdown(); // อัพเดททันทีเมื่อโหลดหน้าเว็บ
    setInterval(updateCountdown, 1000); // อัพเดททุก 1 วินาที
});
