    // ฟังก์ชันสำหรับซ่อน body ทั้งหมด
    function hideAllBodys() {
      const bodys = document.querySelectorAll('body-a');
      bodys.forEach(body => {
        body.style.display = 'none';
      });
    }
    
    // เมื่อคลิก "ประวัตินักเรียน"
    document.getElementById('his-stu').addEventListener('click', function(event) {
      event.stopPropagation();
      // ซ่อน body ทั้งหมดก่อน
      hideAllBodys();
      // แสดง body "ประวัตินักเรียน"
      const bodyHis = document.getElementById('body-his-stu');
      if (bodyHis) {
        bodyHis.style.display = 'block';
      }
    });

// เมื่อคลิก "การศึกษา"
document.getElementById('edu-stu').addEventListener('click', function(event) {
  event.stopPropagation();
  // ซ่อน body ทั้งหมดก่อน
  hideAllBodys();
  // แสดง body "การศึกษา"
  const bodyEdu = document.getElementById('body-edu-stu');
  if (bodyEdu) {
    bodyEdu.style.display = 'block';
  }
});

    // จัดการ toggle เมนู "นักเรียน" (รายการหลัก)
    const studentItem = document.getElementById('student');
    studentItem.addEventListener('click', function(event) {
      // ป้องกัน event bubble ไปยังรายการย่อย
      event.stopPropagation();
      // เลือก sub-menu ภายในเมนู "นักเรียน"
      const subMenu = this.querySelector('ul');
      if (subMenu) {
        subMenu.style.display = (subMenu.style.display === 'none' || subMenu.style.display === '') ? 'block' : 'none';
      }
    });

    // จัดการ toggle เมนู "จัด นักเรียน ชั้น/ห้อง" (sub-menu ภายใน)
    const setStuItem = document.getElementById('set-stu');
    setStuItem.addEventListener('click', function(event) {
      event.stopPropagation();
      const subMenu = this.querySelector('ul');
      if (subMenu) {
        subMenu.style.display = (subMenu.style.display === 'block') ? 'none' : 'block';
      }
    });
