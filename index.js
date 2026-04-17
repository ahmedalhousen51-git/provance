document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تشغيل زرار "ابدأ الآن" (الذي ينقلك لصفحة الاختيارات)
    const mainStartBtn = document.getElementById('mainStartBtn');
    const welcomePage = document.getElementById('welcomePage');
    const selectionScreen = document.getElementById('selectionScreen');

    if (mainStartBtn) {
        mainStartBtn.addEventListener('click', function() {
            // إخفاء صفحة الترحيب وإظهار صفحة الاختيارات
            welcomePage.style.display = 'none';
            selectionScreen.style.display = 'block';
            selectionScreen.classList.add('active');
        });
    }

    // 2. تشغيل زرار الرجوع
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            selectionScreen.style.display = 'none';
            welcomePage.style.display = 'block';
        });
    }

    // 3. برمجة كروت المستخدمين (طالب / شركة / إداري)
    const userCards = document.querySelectorAll('.user-card');
    userCards.forEach(card => {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                // أنيميشن بسيط قبل الانتقال
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    window.location.href = url;
                }, 200);
            }
        });
    });
});

// دالة الاسكرول لزرار "اكتشف المزيد"
window.scrollToAbout = function() {
    const aboutSection = document.getElementById('aboutSection');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
};