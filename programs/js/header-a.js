    // ฟังก์ชันสำหรับซ่อน header ทั้งหมด
    function hideAllHeaders() {
      const headers = document.querySelectorAll('header-a');
      headers.forEach(header => {
        header.style.display = 'none';
      });
    }
    
    // เมื่อคลิก "ประวัตินักเรียน"
    document.getElementById('his-stu').addEventListener('click', function(event) {
      event.stopPropagation();
      // ซ่อน header ทั้งหมดก่อน
      hideAllHeaders();
      // แสดง header "ประวัตินักเรียน"
      const headerHis = document.getElementById('header-his-stu');
      if (headerHis) {
        headerHis.style.display = 'block';
      }
    });

// เมื่อคลิก "การศึกษา"
document.getElementById('edu-stu').addEventListener('click', function(event) {
  event.stopPropagation();
  // ซ่อน header ทั้งหมดก่อน
  hideAllHeaders();
  // แสดง header "การศึกษา"
  const headerEdu = document.getElementById('header-edu-stu');
  if (headerEdu) {
    headerEdu.style.display = 'block';
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
