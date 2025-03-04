document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!user) {
        window.location.href = "https://script.google.com/macros/s/AKfycbwy0lJqri9OKOxQgOCgzXT-Htjyml0J0hSAVkvQtN_Aw2ndNshX8ZxSj7rcHeTMDUSn/exec";  // หากไม่มีผู้ใช้ล็อกอินอยู่ ให้กลับไปหน้า login
    } else {
        document.getElementById("userProfile").textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById("profilePic").src = user.profilePic;
    }
});

function logout() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
