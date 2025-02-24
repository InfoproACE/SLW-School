// ฟังก์ชัน toggle ให้กับ header
    function toggleHeader(headerId) {
      const header = document.getElementById(headerId);
      if (header) {
        // สลับการแสดงผล: ถ้า header ถูกซ่อนอยู่ให้แสดง หากแสดงอยู่ให้ซ่อน
        header.style.display = (header.style.display === 'flex') ? 'none' : 'flex';
      }
    }

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

    // เมื่อคลิกที่ "ประวัตินักเรียน" ให้ toggle header ที่เกี่ยวข้อง
    const hisStuItem = document.getElementById('his-stu');
    hisStuItem.addEventListener('click', function(event) {
      event.stopPropagation(); // ป้องกันไม่ให้ event bubble ไปยังเมนูหลัก
      toggleHeader('header-his-stu');
    });

    // เมื่อคลิกที่ "การศึกษา" ให้ toggle header ที่เกี่ยวข้อง
    const eduStuItem = document.getElementById('edu-stu');
    eduStuItem.addEventListener('click', function(event) {
      event.stopPropagation();
      toggleHeader('header-edu-stu');
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
